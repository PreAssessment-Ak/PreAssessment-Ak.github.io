# ABC Tutoring Website — Claude Code Project Context

This file captures all context from the pre-assessment customer interview and requirements
gathering session. Read this fully before writing any code.

---

## Assessment Overview

This is a pre-assessment for the Upskilling Together program (Stanford SALT Lab).
The task is to build a working website prototype with PostHog analytics, deploy it
to GitHub Pages, simulate traffic, and create a 3–5 slide PDF presentation for the customer.

**Role:** You are representing PostHog, a product analytics service.
**Customer:** Dana, owner of ABC Tutoring.

---

## Customer Background

- Dana runs a tutoring service called **ABC Tutoring**
- Currently manages everything through her phone and a Facebook page
- Wants a real website so parents can browse tutors and book sessions
- Is not technical — all explanations and the final presentation must be in plain language
- Will invoice parents herself; no online payment needed

---

## Website Requirements

### Pages
1. **Home page** (`index.html`) — explains the service, warm welcome, clear CTA to view tutors
2. **Tutor listing page** (`tutors.html`) — browse all 6 tutors
3. **Booking flow** (`booking.html`) — slot picker → contact form → confirmation

### Tutor Cards
Each tutor card must display:
- Name
- Photo (use placeholder images for now — Dana will provide real photos later)
- Subjects they teach
- Grade levels they cover
- Hourly rate
- Available time slots

### Subjects Covered
- Elementary Math through Algebra II
- Science
- Elementary Reading
- Primarily K–12, with a focus on middle school students

### Tutors
Create 6 fictional tutors with realistic names, bios, and varied subjects/availability.

---

## Booking Flow (Important)

1. Parent browses tutor listing page
2. Clicks on a tutor to view their profile and available slots
3. Selects an available time slot
4. Fills in their name and contact information
5. Submits → receives **instant confirmation** on screen
6. That slot is now marked as unavailable for all future visitors

**State management:** Use `localStorage` to persist booked slots across page visits.
There is no backend. GitHub Pages is static hosting only.

**No payment:** Dana invoices parents herself after the booking.

---

## Notifications

- Use **EmailJS** to send Dana an email when a new booking is made
- Email should include: tutor name, slot booked, parent name, parent contact info
- EmailJS credentials will be provided separately — leave as placeholders in code:
  ```js
  const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
  const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
  ```

---

## PostHog Analytics

**PostHog project token** will be provided separately. Leave as a placeholder:
```js
const POSTHOG_TOKEN = "YOUR_POSTHOG_TOKEN";
```

### Events to Track
Dana specifically asked for:
1. **Tutor profile clicks** — which tutors parents are clicking on most
   - Event name: `tutor_profile_clicked`
   - Properties: `tutor_name`, `tutor_subjects`
2. **Subject clicks** — which subjects parents are clicking/filtering by most
   - Event name: `subject_clicked`
   - Properties: `subject_name`

### Additional Recommended Tracking (implement these too)
- `booking_started` — when a parent selects a time slot
- `booking_completed` — when a booking form is successfully submitted
- `page_viewed` — on each page load with `page_name` property

### PostHog Setup
Use the PostHog JS snippet via CDN (no npm, static site):
```html
<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){...})}(document,window.posthog||[]);
  posthog.init(POSTHOG_TOKEN, {api_host: 'https://us.i.posthog.com'})
</script>
```

---

## Design Direction

- **Tone:** Clean and friendly
- **Audience:** Parents of K–12 students
- **No logo or brand colors provided** — choose a palette that feels warm, trustworthy, and approachable
- Suggested palette: soft blues/greens with warm accents
- **Mobile friendly** — parents may visit from their phones
- Placeholder tutor photos until Dana provides real ones (use a service like `https://i.pravatar.cc/150?img=N`)

---

## Technical Constraints

- **Static site only** — GitHub Pages, no server, no backend
- **No payment system**
- **No login or authentication**
- Use `localStorage` for booking state persistence
- All assets must be self-contained or use CDN links
- Target repo: `<organization-name>.github.io`

---

## File Structure to Create

```
index.html          # Home page
tutors.html         # Tutor listing page
booking.html        # Booking flow
css/
  styles.css        # Shared styles
js/
  posthog.js        # PostHog init + tracking helpers
  booking.js        # Booking logic + localStorage
  emailjs.js        # EmailJS notification logic
  tutors.js         # Tutor data
README.md           # Brief project description
simulate-traffic.js # Node script to simulate PostHog events (see below)
```

---

## Traffic Simulation Script

Create a Node.js script (`simulate-traffic.js`) that sends fake PostHog events
to populate the dashboard before the demo. It should simulate:
- Multiple tutor profile clicks (varied tutors)
- Multiple subject clicks
- Booking started and completed events
- Page views

This makes the PostHog dashboard look populated and demonstrates the analytics work.

---

## Submission Checklist

- [ ] Website live at `https://<org-name>.github.io`
- [ ] PostHog token embedded and tracking events
- [ ] EmailJS connected for booking notifications
- [ ] localStorage booking state working
- [ ] Traffic simulation script run against PostHog
- [ ] PostHog dashboard shared publicly (Dashboard → Share → enable public access)
- [ ] 3–5 slide PDF presentation created for Dana (see presentation-outline.md)
- [ ] GitHub repo URL ready to submit

---

## Credentials (fill these in before running)

```
POSTHOG_TOKEN=
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_PUBLIC_KEY=
GITHUB_ORG_NAME=
```
