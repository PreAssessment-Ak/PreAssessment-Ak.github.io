# Tutor Data Spec

Create 6 fictional tutors. Use this as a guide — Claude Code can fill in creative details.

## Requirements Per Tutor
- Name (realistic, diverse)
- Photo URL (use `https://i.pravatar.cc/150?img=N` where N is 1–6)
- Subjects (mix across: Elementary Math, Middle School Math, Algebra I, Algebra II, Science, Elementary Reading)
- Grade levels (K–12 range, focus on middle school)
- Hourly rate ($30–$70 range, varied)
- Available slots (3–5 slots per tutor, varied days/times)

## Example Tutor Object (JavaScript)
```js
{
  id: 1,
  name: "Sarah Chen",
  photo: "https://i.pravatar.cc/150?img=1",
  subjects: ["Algebra I", "Algebra II", "Middle School Math"],
  gradeLevels: "Grades 6–10",
  rate: 55,
  bio: "Former high school math teacher with 8 years of experience...",
  availability: [
    { id: "s1-mon3", label: "Monday 3:00 PM", booked: false },
    { id: "s1-wed4", label: "Wednesday 4:00 PM", booked: false },
    { id: "s1-sat10", label: "Saturday 10:00 AM", booked: false },
  ]
}
```

## Subject Tags for Filtering/Tracking
These are the subject tags PostHog should track clicks on:
- Elementary Math
- Middle School Math
- Algebra I
- Algebra II
- Science
- Elementary Reading
