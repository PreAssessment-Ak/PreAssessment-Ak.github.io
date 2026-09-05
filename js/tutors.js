// Static tutor data for ABC Tutoring.
// This file is the baseline "source of truth" for tutor info and default
// slot availability. It is never modified at runtime — booking.js merges
// this with localStorage overrides at render time (see getMergedTutors).
const TUTORS = [
  {
    id: 1,
    name: "Sarah Chen",
    photo: "https://i.pravatar.cc/150?img=16",
    subjects: ["Algebra I", "Algebra II", "Middle School Math"],
    gradeLevels: "Grades 6–10",
    rate: 55,
    bio: "Former high school math teacher with 8 years of experience helping students build real confidence in algebra.",
    availability: [
      { id: "s1-mon3", label: "Monday, 3:00 PM", booked: false },
      { id: "s1-wed4", label: "Wednesday, 4:00 PM", booked: false },
      { id: "s1-sat10", label: "Saturday, 10:00 AM", booked: false },
    ],
  },
  {
    id: 2,
    name: "Marcus Johnson",
    photo: "https://i.pravatar.cc/150?img=13",
    subjects: ["Science", "Middle School Math"],
    gradeLevels: "Grades 5–8",
    rate: 45,
    bio: "Engineer-turned-tutor who makes science concepts click with hands-on, real-world examples.",
    availability: [
      { id: "s2-tue2", label: "Tuesday, 2:00 PM", booked: false },
      { id: "s2-thu5", label: "Thursday, 5:00 PM", booked: false },
      { id: "s2-sat11", label: "Saturday, 11:00 AM", booked: false },
      { id: "s2-sun3", label: "Sunday, 3:00 PM", booked: false },
    ],
  },
  {
    id: 3,
    name: "Priya Patel",
    photo: "https://i.pravatar.cc/150?img=27",
    subjects: ["Elementary Math", "Elementary Reading"],
    gradeLevels: "Grades K–5",
    rate: 40,
    bio: "Patient and encouraging, Priya specializes in building strong reading and math foundations for young learners.",
    availability: [
      { id: "s3-mon10", label: "Monday, 10:00 AM", booked: false },
      { id: "s3-tue2", label: "Tuesday, 2:00 PM", booked: true },
      { id: "s3-thu3", label: "Thursday, 3:00 PM", booked: false },
      { id: "s3-sat9", label: "Saturday, 9:00 AM", booked: false },
    ],
  },
  {
    id: 4,
    name: "David Kim",
    photo: "https://i.pravatar.cc/150?img=8",
    subjects: ["Algebra II", "Science"],
    gradeLevels: "Grades 8–12",
    rate: 65,
    bio: "PhD candidate in physics who loves helping students tackle advanced algebra and science with clarity and patience.",
    availability: [
      { id: "s4-mon5", label: "Monday, 5:00 PM", booked: false },
      { id: "s4-wed6", label: "Wednesday, 6:00 PM", booked: false },
      { id: "s4-fri4", label: "Friday, 4:00 PM", booked: false },
      { id: "s4-sun1", label: "Sunday, 1:00 PM", booked: false },
    ],
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    photo: "https://i.pravatar.cc/150?img=5",
    subjects: ["Elementary Reading", "Elementary Math"],
    gradeLevels: "Grades K–6",
    rate: 35,
    bio: "Bilingual elementary teacher passionate about helping kids fall in love with reading and math.",
    availability: [
      { id: "s5-tue4", label: "Tuesday, 4:00 PM", booked: false },
      { id: "s5-thu10", label: "Thursday, 10:00 AM", booked: false },
      { id: "s5-sat1", label: "Saturday, 1:00 PM", booked: false },
    ],
  },
  {
    id: 6,
    name: "James Okafor",
    photo: "https://i.pravatar.cc/150?img=14",
    subjects: ["Middle School Math", "Algebra I", "Science"],
    gradeLevels: "Grades 6–9",
    rate: 50,
    bio: "Energetic tutor who blends math and science to show students how the subjects connect in real life.",
    availability: [
      { id: "s6-mon4", label: "Monday, 4:00 PM", booked: false },
      { id: "s6-wed3", label: "Wednesday, 3:00 PM", booked: false },
      { id: "s6-fri5", label: "Friday, 5:00 PM", booked: false },
      { id: "s6-sat2", label: "Saturday, 2:00 PM", booked: false },
    ],
  },
];

// All subject tags PostHog should track clicks on / that the filter bar uses.
const SUBJECTS = [
  "Elementary Math",
  "Middle School Math",
  "Algebra I",
  "Algebra II",
  "Science",
  "Elementary Reading",
];
