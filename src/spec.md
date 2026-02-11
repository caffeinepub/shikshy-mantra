# Specification

## Summary
**Goal:** Build a “Shikshy mantra” coaching institute web app with a public landing page, student signup flow, and an authenticated/admin-only panel to view submitted signups.

**Planned changes:**
- Create a public landing page titled “Shikshy mantra” with navigation to Student Signup and Admin Panel (client-side routing).
- Add Internet Identity sign-in/sign-out UI and show signed-in principal (or logged-out state).
- Implement Student Signup form (full name, phone number, email, course of interest) with validation, success state, persistence, and a page to view the submitted profile.
- Implement Admin Panel route protection (auth required, admin-only authorization) with access denied messaging for non-admins.
- Add backend Motoko data model + APIs to create signups, and admin-only list/get-by-id endpoints with stable persistence.
- Apply a consistent education/coaching visual theme across pages, using a non-blue/purple primary palette.
- Add and render static generated brand images from `frontend/public/assets/generated` (logo on landing page).

**User-visible outcome:** Visitors can view the Shikshy mantra landing page, students can sign up and view their submitted details after refresh, and admins (after Internet Identity sign-in) can access an Admin Panel to list and view student signup details.
