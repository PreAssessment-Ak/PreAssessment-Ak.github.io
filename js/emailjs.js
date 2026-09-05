// EmailJS notification setup.
// Replace these with the real values from the EmailJS dashboard.
const EMAILJS_SERVICE_ID = "service_ksv9fzi";
const EMAILJS_TEMPLATE_ID = "template_fqdh9v8";
const EMAILJS_PUBLIC_KEY = "DH3SsLlsCfb_wwMwc";

if (window.emailjs) {
  // @emailjs/browser v4 requires an options object, not a bare string —
  // passing a string here silently sends an invalid/undefined public key.
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

// Best-effort notification to Dana when a booking is made. Returns a
// Promise; callers should treat failure as non-fatal (the booking itself
// is already saved to localStorage and confirmed on-screen regardless of
// whether this email goes through).
function sendBookingNotification({ tutorName, slotLabel, parentName, parentContact }) {
  if (!window.emailjs) {
    return Promise.reject(new Error("EmailJS SDK not loaded"));
  }
  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    tutor_name: tutorName,
    slot_label: slotLabel,
    parent_name: parentName,
    parent_contact: parentContact,
  });
}
