# MPC Admin Console

Minimal Next.js + TypeScript + Tailwind CSS admin console starter MVP.

## Included screens

- Admin login
- Dashboard
- Users list
- User detail
- System controls

## Connected backend endpoints

- `POST /v1/admin/auth/login`
- `GET /v1/admin/auth/me`
- `POST /v1/admin/auth/logout`
- `GET /v1/admin/dashboard`
- `GET /v1/admin/system-controls`
- `PATCH /v1/admin/system-controls`
- `GET /v1/admin/users`
- `GET /v1/admin/users/:userId`
- `POST /v1/admin/users/:userId/clear-session-memory`

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open `http://localhost:3000`.

## Environment

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3002
```

For staging/demo, point it to your deployed API base URL.

## Notes

- Requests use `credentials: 'include'` because the backend auth is cookie-based.
- The app uses client-side auth checks against `/v1/admin/auth/me`.
- Some dashboard/user activity sections include graceful demo fallbacks when backend data is sparse.
