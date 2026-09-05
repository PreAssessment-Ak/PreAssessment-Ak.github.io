# ABC Tutoring Website

A static prototype website for ABC Tutoring, a K–12 tutoring service. Parents can browse tutors, pick an available time slot, and book a session — with instant on-screen confirmation and an email notification to Dana. Built as a static site (no backend) with PostHog analytics wired in.

## What's included

```
index.html          Home page
tutors.html         Browse all 6 tutors, filter by subject
booking.html        Slot picker -> contact form -> confirmation
css/styles.css      Shared styles
js/tutors.js        Tutor data (names, subjects, rates, availability)
js/booking.js       localStorage booking state + availability merge logic
js/posthog.js       PostHog init + page_viewed tracking
js/emailjs.js       EmailJS booking notification
simulate-traffic.js Populates the PostHog dashboard with realistic demo traffic
```

## Running locally

This site has no build step, but it must be served over HTTP (not opened directly as a `file://` URL) for `localStorage` and the CDN scripts to work correctly. From this folder, run one of:

```
npx serve .
```
or
```
python -m http.server
```

Then open the printed local URL in your browser.

## Filling in credentials

Before going live, replace these placeholders:

| Credential | File |
|---|---|
| `POSTHOG_TOKEN` | `js/posthog.js` (committed — see note below) |
| `POSTHOG_TOKEN` for the traffic simulator | passed as an environment variable, never committed — see [Populating the PostHog dashboard](#populating-the-posthog-dashboard-with-demo-traffic) |
| `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY` | `js/emailjs.js` |
| `GITHUB_ORG_NAME` | used for the deployed site URL, `https://<org-name>.github.io` |

**Note on `js/posthog.js`:** this is the one credential that's committed in plain sight on purpose. It's PostHog's client-side "Project API Key" (the `phc_...` value), which PostHog explicitly designs to be public — anyone can view it in any site's page source, and it can only submit events, not read your data or account. A static GitHub Pages site has no backend to hide it behind, so this is the normal, expected way client-side analytics (PostHog, Google Analytics, etc.) work. If you want extra protection, set an allowed-origins restriction on the token in your PostHog project settings so it only accepts events from your real domain.

## Deploying to GitHub Pages

1. Push this repo to `<org-name>.github.io` on GitHub (or any repo, with Pages enabled).
2. In the repo, go to **Settings → Pages** and set the source branch to `main`.
3. The site will be live at `https://<org-name>.github.io` within a few minutes.

## Populating the PostHog dashboard with demo traffic

This script runs locally only (it never touches the deployed site), so its token is never written into the file or committed — pass it as an environment variable instead:

```
# PowerShell
$env:POSTHOG_TOKEN = "phc_your_real_token"; node simulate-traffic.js

# bash
POSTHOG_TOKEN="phc_your_real_token" node simulate-traffic.js
```

This sends exactly 100 events in a realistic mix — 40% page views, 30% tutor profile clicks, 20% subject clicks, and 10% bookings (split 6 started / 4 completed) — with popularity skew across tutors/subjects and timestamps weighted toward evenings and weekends over the last two weeks, so the dashboard looks populated before a demo. It's for demo purposes only — real traffic will populate the dashboard on its own once the site is live.

## Known limitation: booking state is per-browser

Booked slots are tracked in the browser's `localStorage`, since this is a static site with no backend database. That means a slot marked "booked" is only unavailable to future visitors **on that same browser/device** — it does not sync across different parents' phones or computers. A real shared booking calendar (so a slot booked by one parent is instantly unavailable to everyone) would require a backend, which is out of scope for this static-hosting prototype.
