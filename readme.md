# Auth application
Implement an application that allows user to:
- Register using name, email and password (only non authenticated)
  - Inform the users about the rules for a password and check them
  - send and activation email
- Actvation page (only non authenticated)
  - the user should be activated only after email confirmation
  - redirect to Profile after the activation
- Login with valid credentials (email and password) (only non authenticated)
  - If user is not active ask them to activate their email
  - Redirect to profile after login
- Logout (only authenticated)
  - Redirect to login after logging out
- Password reset (only non authenticated)
  - Ask for an email
  - Show email sent page
  - add Reset Password confirmation page (with `password` and `confirmation` fields that must be equal)
  - Show Success page with a link to login
- Profile page (only authenticated)
  - You can change a name
  - It allows to change a password (require an old one, `new password` and `confirmation`)
  - To change an email you should type the password, confirm the new email and notify the old email about the change
- 404 for all the other pages

## (Optional) Advanced tasks
- Implement Sign-up with Google, Facebook, Github (use Passport.js lib)
- Profile page should allow to add/remove any social account
- Add authentication to your Accounting App

## Current implementation status

Recent git history shows the project has already moved through these setup steps:
- backend dependencies and TypeScript backend skeleton were added
- backend tests were migrated from Jest to Vitest
- frontend was scaffolded, then migrated from `react-scripts` to Vite and Vitest
- header, routes, and the login/registration form UI were added

Current repository state:
- Backend:
  - Express app exists with `cors`, `cookie-parser`, and JSON parsing
  - one auth route exists: `POST /registration`
  - controller logic is still a stub and currently responds with `Hello!`
  - Prisma is configured, but the schema does not contain models yet
- Frontend:
  - React app exists under `src/client`
  - routes exist for home, profile, login, and 404
  - login/registration form UI exists
  - frontend form validation is started, but submit is not connected to a real auth API yet
  - protected/public route behavior is not implemented yet
- Tests:
  - backend test coverage currently checks only the registration stub response
  - frontend tests currently cover home rendering and form validation behavior

## What is done

- Project structure for separate backend and frontend work is in place
- Docker and Prisma tooling are added to the repository
- Backend app bootstrap is working and compiles
- Frontend app bootstrap is working and builds with Vite
- Basic pages and navigation exist
- Registration/login form UI exists with initial client-side validation

## What still needs to be implemented

To complete the task from this file, the project still needs these pieces:

1. Database and persistence
   - define Prisma models for `User` and token storage
   - add migrations
   - generate and use the Prisma client in backend services

2. Real backend auth flow
   - replace the registration stub with actual validation, uniqueness checks, password hashing, token creation, and activation email flow
   - add login, logout, current-user, activation, password reset, profile update, password change, and email change endpoints
   - add proper error handling and response contracts

3. Session handling
   - choose a session strategy
   - recommended baseline: `HttpOnly` cookie backed by backend session or refresh-token validation
   - add auth middleware for protected endpoints

4. Frontend auth integration
   - connect the form to the backend API
   - store auth state in frontend memory/state, not as security truth
   - restore user session from backend
   - add redirects for authenticated-only and guest-only routes

5. Missing pages and flows
   - activation result page
   - password reset request page
   - password reset confirmation page
   - success/info states for email-based flows
   - real profile editing UI

## Immediate next steps

Recommended order to finish the task:

1. Finalize Prisma schema and migration.
2. Implement real backend registration with validation and activation token generation.
3. Implement login plus session cookie strategy.
4. Add `GET /me` and auth middleware.
5. Connect the frontend form to the backend and add route guards.
6. Build the remaining activation, reset-password, logout, and profile flows.

## Environment note

- Keep backend `CLIENT_URL` aligned with the client dev server port.
- If the client runs on a different Vite port than the backend sample env expects, update `CLIENT_URL` so CORS matches the actual frontend origin.
