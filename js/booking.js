// Booking state management.
//
// IMPORTANT LIMITATION: This is a static site with no backend, so booking
// state lives in the browser's localStorage. "This slot is now unavailable
// for all future visitors" only holds true for visitors on THIS browser /
// device — it does not sync across different parents' computers or phones.
// A real shared booking calendar would require a backend database.

const BOOKINGS_KEY = "abc_tutoring_bookings";

function getBookings() {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to read bookings from localStorage:", err);
    return [];
  }
}

function saveBooking(record) {
  const bookings = getBookings();
  bookings.push(record);
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  } catch (err) {
    console.error("Failed to save booking to localStorage:", err);
  }
}

function isSlotBooked(slotId, staticBooked) {
  if (staticBooked) return true;
  return getBookings().some((b) => b.slotId === slotId);
}

// Returns a deep copy of TUTORS with each slot's `booked` flag updated to
// reflect any bookings made in this browser. Both tutors.html and
// booking.html should render from this, never from raw TUTORS.
function getMergedTutors() {
  return TUTORS.map((tutor) => ({
    ...tutor,
    availability: tutor.availability.map((slot) => ({
      ...slot,
      booked: isSlotBooked(slot.id, slot.booked),
    })),
  }));
}

function getMergedTutorById(id) {
  return getMergedTutors().find((t) => t.id === id) || null;
}
