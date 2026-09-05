// Simulates realistic parent traffic on the ABC Tutoring site so the
// PostHog dashboard has believable data before a demo.
//
// Sends exactly 100 events, split by the ratio a real tutoring site's
// traffic would roughly follow:
//   40 page views        (40%)
//   30 tutor profile clicks (30%)
//   20 subject clicks     (20%)
//   10 bookings           (10%, split 6 started / 4 completed to reflect
//                          realistic drop-off between picking a slot and
//                          actually submitting the form)
//
// Each event gets its own randomized distinct_id (drawn from a pool of 30
// simulated visitors, so some visitors show up more than once, like real
// traffic) and a timestamp spread over the last 14 days, weighted toward
// evenings and weekends (parents browsing after work/school).
//
// Run with: node simulate-traffic.js  (requires Node 18+ for global fetch)
//
// This is a local-only script (never served to a browser), so the real
// token is never hardcoded/committed here — pass it as an environment
// variable instead, so it never ends up in git history:
//   PowerShell:  $env:POSTHOG_TOKEN = "phc_..."; node simulate-traffic.js
//   bash:        POSTHOG_TOKEN="phc_..." node simulate-traffic.js

const POSTHOG_TOKEN = process.env.POSTHOG_TOKEN || "YOUR_POSTHOG_TOKEN";
const POSTHOG_HOST = "https://us.i.posthog.com";

const EVENT_COUNTS = {
  page_viewed: 40,
  tutor_profile_clicked: 30,
  subject_clicked: 20,
  booking_started: 6,
  booking_completed: 4,
};

const NUM_VISITORS = 30;

// Mirrors js/tutors.js — kept as a separate literal here since this is a
// standalone Node script with no DOM/browser module to import from.
const TUTORS = [
  { name: "Sarah Chen", subjects: ["Algebra I", "Algebra II", "Middle School Math"], weight: 3, slots: ["Monday, 3:00 PM", "Wednesday, 4:00 PM", "Saturday, 10:00 AM"] },
  { name: "Marcus Johnson", subjects: ["Science", "Middle School Math"], weight: 1.5, slots: ["Tuesday, 2:00 PM", "Thursday, 5:00 PM", "Saturday, 11:00 AM"] },
  { name: "Priya Patel", subjects: ["Elementary Math", "Elementary Reading"], weight: 1, slots: ["Monday, 10:00 AM", "Thursday, 3:00 PM", "Saturday, 9:00 AM"] },
  { name: "David Kim", subjects: ["Algebra II", "Science"], weight: 2, slots: ["Monday, 5:00 PM", "Wednesday, 6:00 PM", "Friday, 4:00 PM"] },
  { name: "Emily Rodriguez", subjects: ["Elementary Reading", "Elementary Math"], weight: 1, slots: ["Tuesday, 4:00 PM", "Saturday, 1:00 PM"] },
  { name: "James Okafor", subjects: ["Middle School Math", "Algebra I", "Science"], weight: 3, slots: ["Monday, 4:00 PM", "Wednesday, 3:00 PM", "Friday, 5:00 PM"] },
];

const SUBJECT_WEIGHTS = [
  { value: "Middle School Math", weight: 3 },
  { value: "Algebra I", weight: 2.5 },
  { value: "Science", weight: 2 },
  { value: "Algebra II", weight: 1.5 },
  { value: "Elementary Math", weight: 1 },
  { value: "Elementary Reading", weight: 1 },
];

const PAGE_NAME_WEIGHTS = [
  { value: "home", weight: 5 },
  { value: "tutors", weight: 3.5 },
  { value: "booking", weight: 1.5 },
];

const PARENT_FIRST_NAMES = ["Jane", "Michael", "Aisha", "Carlos", "Wei", "Fatima", "Robert", "Grace", "Diego", "Hannah"];
const PARENT_LAST_NAMES = ["Doe", "Smith", "Khan", "Garcia", "Chen", "Ahmed", "Brown", "Lee", "Martinez", "Wilson"];

const VISITOR_IDS = Array.from({ length: NUM_VISITORS }, (_, i) => `sim-user-${i + 1}`);

function weightedPick(items) {
  const total = items.reduce((sum, i) => sum + i.weight, 0);
  let roll = Math.random() * total;
  for (const item of items) {
    roll -= item.weight;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomVisitorId() {
  return VISITOR_IDS[randInt(0, VISITOR_IDS.length - 1)];
}

function randomParentName() {
  return `${PARENT_FIRST_NAMES[randInt(0, PARENT_FIRST_NAMES.length - 1)]} ${PARENT_LAST_NAMES[randInt(0, PARENT_LAST_NAMES.length - 1)]}`;
}

// Timestamps spread over the last 14 days, weighted toward evenings (6-9pm)
// and weekend daytime hours, so events don't all cluster at "now".
function randomTimestamp() {
  const dayOffset = randInt(0, 13);
  const date = new Date();
  date.setDate(date.getDate() - dayOffset);
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const hourItems = [];
  for (let h = 0; h < 24; h++) {
    let weight = 1;
    if (h >= 18 && h <= 21) weight = 3;
    if (isWeekend && h >= 10 && h <= 16) weight = Math.max(weight, 2);
    hourItems.push({ value: h, weight });
  }
  const hour = weightedPick(hourItems).value;
  date.setHours(hour, randInt(0, 59), randInt(0, 59), 0);
  return date;
}

function buildEvent(eventName, properties) {
  return {
    event: eventName,
    distinct_id: randomVisitorId(),
    properties,
    timestamp: randomTimestamp().toISOString(),
  };
}

function buildBatch() {
  const batch = [];

  for (let i = 0; i < EVENT_COUNTS.page_viewed; i++) {
    batch.push(buildEvent("page_viewed", { page_name: weightedPick(PAGE_NAME_WEIGHTS).value }));
  }

  for (let i = 0; i < EVENT_COUNTS.tutor_profile_clicked; i++) {
    const tutor = weightedPick(TUTORS);
    batch.push(buildEvent("tutor_profile_clicked", { tutor_name: tutor.name, tutor_subjects: tutor.subjects.join(", ") }));
  }

  for (let i = 0; i < EVENT_COUNTS.subject_clicked; i++) {
    batch.push(buildEvent("subject_clicked", { subject_name: weightedPick(SUBJECT_WEIGHTS).value }));
  }

  for (let i = 0; i < EVENT_COUNTS.booking_started; i++) {
    const tutor = weightedPick(TUTORS);
    const slotLabel = tutor.slots[randInt(0, tutor.slots.length - 1)];
    batch.push(buildEvent("booking_started", { tutor_name: tutor.name, slot_label: slotLabel }));
  }

  for (let i = 0; i < EVENT_COUNTS.booking_completed; i++) {
    const tutor = weightedPick(TUTORS);
    const slotLabel = tutor.slots[randInt(0, tutor.slots.length - 1)];
    batch.push(buildEvent("booking_completed", { tutor_name: tutor.name, slot_label: slotLabel, parent_name: randomParentName() }));
  }

  // Sort oldest-to-newest so the batch reads like a real timeline.
  batch.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  return batch;
}

function summarize(batch) {
  const counts = {};
  const tutorClicks = {};
  const subjectClicks = {};

  for (const e of batch) {
    counts[e.event] = (counts[e.event] || 0) + 1;
    if (e.event === "tutor_profile_clicked") {
      tutorClicks[e.properties.tutor_name] = (tutorClicks[e.properties.tutor_name] || 0) + 1;
    }
    if (e.event === "subject_clicked") {
      subjectClicks[e.properties.subject_name] = (subjectClicks[e.properties.subject_name] || 0) + 1;
    }
  }

  const topTutor = Object.entries(tutorClicks).sort((a, b) => b[1] - a[1])[0];
  const topSubject = Object.entries(subjectClicks).sort((a, b) => b[1] - a[1])[0];

  console.log(`\nTotal events: ${batch.length}`);
  console.log("Breakdown by event type:");
  Object.entries(counts).forEach(([event, count]) => console.log(`  ${event}: ${count} (${Math.round((count / batch.length) * 100)}%)`));
  if (topTutor) console.log(`Most-clicked tutor: ${topTutor[0]} (${topTutor[1]} clicks)`);
  if (topSubject) console.log(`Most-clicked subject: ${topSubject[0]} (${topSubject[1]} clicks)`);
  console.log("\nIt may take a minute for events to appear on the PostHog dashboard.");
}

async function sendBatch(batch) {
  const chunkSize = 100;
  for (let i = 0; i < batch.length; i += chunkSize) {
    const chunk = batch.slice(i, i + chunkSize);
    const res = await fetch(`${POSTHOG_HOST}/batch/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: POSTHOG_TOKEN, batch: chunk }),
    });
    if (!res.ok) {
      throw new Error(`PostHog batch request failed: ${res.status} ${await res.text()}`);
    }
  }
}

async function main() {
  if (POSTHOG_TOKEN === "YOUR_POSTHOG_TOKEN") {
    console.warn("POSTHOG_TOKEN is still a placeholder — fill it in at the top of simulate-traffic.js before running. Exiting without sending any events.");
    return;
  }

  const batch = buildBatch();

  console.log(`Sending ${batch.length} events to PostHog...`);
  await sendBatch(batch);
  summarize(batch);
}

main().catch((err) => {
  console.error("Traffic simulation failed:", err);
  process.exitCode = 1;
});
