# TherellWalker — Trading Journal Application

A professional trading journal platform to help traders track, analyze, and improve their trading performance through comprehensive trade logging and reflection features.

## Features

### Authentication
- Secure login & registration with email verification
- Password recovery with OTP verification
- Protected routes for authenticated users
- Google OAuth sign-in

### Trading Management
- Trade entry with detailed fields
- Trade log to view and manage trading history
- Automatic profit & loss calculation
- Trading reflections and notes

### User Experience
- Responsive, mobile-first design using Tailwind CSS
- Dark theme with purple gradients
- Toast notifications for real-time feedback
- Robust form validation with React Hook Form

## Tech Stack
- Frontend: React (latest stable), Vite (latest stable)
- Routing: React Router DOM
- Styling: Tailwind CSS
- Forms: React Hook Form
- HTTP: Axios
- Mocking (dev): MSW (Mock Service Worker)
- Notifications: React Toastify
- State: React Context API and localStorage

> Note: I removed pinned/incorrect version numbers. If you want exact versions in the README, tell me which ones and I will add them.

## Project Structure

```
therellwalker/
├── public/
│   └── mockServiceWorker.js
├── src/
│   ├── api/
│   │   ├── axiosInstance.js
│   │   ├── httpEndpoints.js
│   │   └── httpMethods.js
│   ├── assets/
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthLayout.jsx
│   │   └── common/
│   │       ├── Button.jsx
│   │       ├── DashboardLayout.jsx
│   │       ├── Header.jsx
│   │       ├── Input.jsx
│   │       ├── MainLayout.jsx
│   │       └── Sidebar.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── mocks/
│   │   ├── browser.js
│   │   └── handlers.js
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── CreateNewPassword.jsx
│   │   │   ├── CreatePassword.jsx
│   │   │   ├── EmailVerification.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ResetPasswordOtp.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── VerifyOtp.jsx
│   │   └── dashboard/
│   │       ├── DashboardHome.jsx
│   │       ├── Reflections.jsx
│   │       ├── TradeEntry.jsx
│   │       └── TradeLog.jsx
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   ├── utils/
│   │   └── calculatePnL.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .eslintrc.js
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Design System

Colors
- Background: #0D061A (deep purple)
- Cards: #1B0C33 (card background)
- Primary: #8B5CF6 / #7C3AED (brand violet)
- Inputs: semi-transparent white overlays

Typography
- Headings: Lato (semibold)
- Body: Open Sans (regular)
- Buttons: Lato (semibold)
- Google button: Poppins (semibold)

## Installation & Setup

Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

Quick start
1. Clone the repository
   ```bash
   git clone <repository-url>
   cd therellwalker
   ```
2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```
3. Start development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open http://localhost:5173

## Available Scripts
- npm run dev — start dev server (HMR)
- npm run build — build production assets
- npm run preview — preview production build
- npm run lint — run ESLint

## Authentication Flow

Signup:
1. /signup — enter name and email
2. /email-verification — email verification step
3. /verify-otp — enter OTP
4. /create-password — create password
5. Redirect to dashboard

Login:
1. /login — enter credentials
2. Validate and store session token
3. Redirect to dashboard

Password reset:
1. /forgot-password — request reset
2. Email with OTP
3. /reset-password-otp — verify OTP
4. /create-new-password — set new password
5. Redirect to login

## Implementation Notes

- Protected routes use ProtectedRoute + useAuth to enforce authentication
- Forms use React Hook Form + custom validation rules
- Centralized axios instance with interceptors for auth and error handling
- MSW used to mock API during development
- AuthContext + localStorage used for session persistence

## Future Enhancements
- Trade analytics & charts
- Performance dashboard
- Export (CSV/PDF)
- Theme toggle (dark/light)
- Multi-language support
- Mobile app
- Social features (share reflections)
- AI-powered trade insights

## Contributing
1. Fork the repo
2. Create a branch: git checkout -b feature/YourFeature
3. Commit: git commit -m "Add feature"
4. Push: git push origin feature/YourFeature
5. Open a Pull Request

## License
Private / proprietary

## Developer
Built by the TherellWalker Team

---



