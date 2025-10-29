# TherellWalker — Trading Journal Application# TherellWalker — Trading Journal Application

A professional trading journal platform to help traders track, analyze, and improve their trading performance through comprehensive trade logging and reflection features.A professional trading journal platform to help traders track, analyze, and improve their trading performance through comprehensive trade logging and reflection features.

## Features## Features

### Authentication### Authentication

- Secure login & registration with email verification

- Password recovery with OTP verification- Secure login & registration with email verification

- Protected routes for authenticated users- Password recovery with OTP verification

- Google OAuth sign-in- Protected routes for authenticated users

- Google OAuth sign-in

### Trading Management

- Trade entry with detailed fields### Trading Management

- Trade log to view and manage trading history

- Automatic profit & loss calculation- Trade entry with detailed fields

- Trading reflections and notes- Trade log to view and manage trading history

- Automatic profit & loss calculation

### User Experience- Trading reflections and notes

- Responsive, mobile-first design using Tailwind CSS

- Dark theme with purple gradients### User Experience

- Toast notifications for real-time feedback

- Robust form validation with React Hook Form- Responsive, mobile-first design using Tailwind CSS

- Dark theme with purple gradients

## Tech Stack- Toast notifications for real-time feedback

- Robust form validation with React Hook Form

- **Frontend:** React 19, Vite 7

- **Routing:** React Router DOM## Tech Stack

- **Styling:** Tailwind CSS 4

- **Forms:** React Hook Form- Frontend: React (latest stable), Vite (latest stable)

- **HTTP Client:** Axios- Routing: React Router DOM

- **Notifications:** React Toastify- Styling: Tailwind CSS

- **State Management:** React Context API- Forms: React Hook Form

- **Authentication:** JWT with cookies- HTTP: Axios

- Mocking (dev): MSW (Mock Service Worker)

## Project Structure- Notifications: React Toastify

- State: React Context API and localStorage

````

therellwalker/> Note: I removed pinned/incorrect version numbers. If you want exact versions in the README, tell me which ones and I will add them.

├── public/

├── src/## Project Structure

│   ├── api/

│   │   ├── authService.js```

│   │   ├── axiosInstance.jstherellwalker/

│   │   ├── httpEndpoints.js├── public/

│   │   ├── httpMethods.js│   └── mockServiceWorker.js

│   │   ├── reflectionService.js├── src/

│   │   ├── tradeService.js│   ├── api/

│   │   └── userService.js│   │   ├── axiosInstance.js

│   ├── assets/│   │   ├── httpEndpoints.js

│   ├── components/│   │   └── httpMethods.js

│   │   ├── auth/│   ├── assets/

│   │   │   └── AuthLayout.jsx│   ├── components/

│   │   └── common/│   │   ├── auth/

│   │       ├── Button.jsx│   │   │   └── AuthLayout.jsx

│   │       ├── DashboardLayout.jsx│   │   └── common/

│   │       ├── FeedbackButton.jsx│   │       ├── Button.jsx

│   │       ├── Header.jsx│   │       ├── DashboardLayout.jsx

│   │       ├── Input.jsx│   │       ├── Header.jsx

│   │       ├── MainLayout.jsx│   │       ├── Input.jsx

│   │       └── Sidebar.jsx│   │       ├── MainLayout.jsx

│   ├── context/│   │       └── Sidebar.jsx

│   │   ├── AuthContext.jsx│   ├── context/

│   │   └── TradeContext.jsx│   │   └── AuthContext.jsx

│   ├── data/│   ├── hooks/

│   │   └── reflectionPrompts.js│   │   └── useAuth.js

│   ├── hooks/│   ├── mocks/

│   │   └── useAuth.js│   │   ├── browser.js

│   ├── pages/│   │   └── handlers.js

│   │   ├── auth/│   ├── pages/

│   │   │   ├── CreateNewPassword.jsx│   │   ├── auth/

│   │   │   ├── CreatePassword.jsx│   │   │   ├── CreateNewPassword.jsx

│   │   │   ├── EmailVerification.jsx│   │   │   ├── CreatePassword.jsx

│   │   │   ├── ForgotPassword.jsx│   │   │   ├── EmailVerification.jsx

│   │   │   ├── Login.jsx│   │   │   ├── ForgotPassword.jsx

│   │   │   ├── ResetPasswordOtp.jsx│   │   │   ├── Login.jsx

│   │   │   ├── Signup.jsx│   │   │   ├── ResetPasswordOtp.jsx

│   │   │   └── VerifyOtp.jsx│   │   │   ├── Signup.jsx

│   │   └── dashboard/│   │   │   └── VerifyOtp.jsx

│   │       ├── DashboardHome.jsx│   │   └── dashboard/

│   │       ├── Profile.jsx│   │       ├── DashboardHome.jsx

│   │       ├── Reflections.jsx│   │       ├── Reflections.jsx

│   │       ├── TradeEntry.jsx│   │       ├── TradeEntry.jsx

│   │       └── TradeLog.jsx│   │       └── TradeLog.jsx

│   ├── routes/│   ├── routes/

│   │   ├── AppRoutes.jsx│   │   ├── AppRoutes.jsx

│   │   └── ProtectedRoute.jsx│   │   └── ProtectedRoute.jsx

│   ├── utils/│   ├── utils/

│   │   └── calculatePnL.js│   │   └── calculatePnL.js

│   ├── App.jsx│   ├── App.jsx

│   ├── index.css│   ├── index.css

│   └── main.jsx│   └── main.jsx

├── .gitignore├── .eslintrc.js

├── eslint.config.js├── index.html

├── index.html├── package.json

├── package.json├── tailwind.config.js

├── README.md└── vite.config.js

├── tailwind.config.js```

└── vite.config.js

```## Design System



## Design SystemColors



### Colors- Background: #0D061A (deep purple)

- Background: `#0D061A` (deep purple)- Cards: #1B0C33 (card background)

- Cards: `#1B0C33` (card background)- Primary: #8B5CF6 / #7C3AED (brand violet)

- Primary: `#8B5CF6` / `#7C3AED` (brand violet)- Inputs: semi-transparent white overlays

- Inputs: semi-transparent white overlays

Typography

### Typography

- Headings: Lato (semibold)- Headings: Lato (semibold)

- Body: Open Sans (regular)- Body: Open Sans (regular)

- Buttons: Lato (semibold)- Buttons: Lato (semibold)

- Google button: Poppins (semibold)

## Installation & Setup

## Installation & Setup

### Prerequisites

- Node.js (v20+)Prerequisites

- npm (v9+)

- Node.js (v18+ recommended)

### Quick Start- npm or yarn



1. Clone the repositoryQuick start

   ```bash

   git clone <repository-url>1. Clone the repository

   cd therellwalker   ```bash

   ```   git clone <repository-url>

   cd therellwalker

2. Install dependencies   ```

   ```bash2. Install dependencies

   npm install   ```bash

   ```   npm install

   # or

3. Create `.env` file with required environment variables:   yarn

   ```   ```

   VITE_API_BASE_URL=your_backend_api_url3. Start development server

   VITE_GOOGLE_CLIENT_ID=your_google_client_id   ```bash

   ```   npm run dev

   # or

4. Start development server   yarn dev

   ```bash   ```

   npm run dev4. Open http://localhost:5173

````

## Available Scripts

5. Open http://localhost:5173

- npm run dev — start dev server (HMR)

## Available Scripts- npm run build — build production assets

- npm run preview — preview production build

- `npm run dev` — Start development server- npm run lint — run ESLint

- `npm run build` — Build for production

- `npm run preview` — Preview production build## Authentication Flow

- `npm run lint` — Run ESLint

Signup:

## Authentication Flow

1. /signup — enter name and email

### Signup2. /email-verification — email verification step

1. `/signup` — Enter name and email3. /verify-otp — enter OTP

2. `/email-verification` — Email verification step4. /create-password — create password

3. `/verify-otp` — Enter OTP5. Redirect to dashboard

4. `/create-password` — Create password

5. Redirect to dashboardLogin:

### Login1. /login — enter credentials

1. `/login` — Enter credentials2. Validate and store session token

2. Validate and store session token3. Redirect to dashboard

3. Redirect to dashboard

Password reset:

### Password Reset

1. `/forgot-password` — Request reset1. /forgot-password — request reset

2. Email with OTP2. Email with OTP

3. `/reset-password-otp` — Verify OTP3. /reset-password-otp — verify OTP

4. `/create-new-password` — Set new password4. /create-new-password — set new password

5. Redirect to login5. Redirect to login

## API Integration## Implementation Notes

All API calls are handled through centralized service modules:- Protected routes use ProtectedRoute + useAuth to enforce authentication

- **authService.js** — Authentication endpoints- Forms use React Hook Form + custom validation rules

- **userService.js** — User profile management- Centralized axios instance with interceptors for auth and error handling

- **tradeService.js** — Trade CRUD operations- MSW used to mock API during development

- **reflectionService.js** — Reflection management- AuthContext + localStorage used for session persistence

The `axiosInstance.js` provides:## Future Enhancements

- Automatic JWT token injection

- Global error handling- Trade analytics & charts

- Request/response interceptors- Performance dashboard

- 401 auto-logout- Export (CSV/PDF)

- Theme toggle (dark/light)

## Contributing- Multi-language support

- Mobile app

1. Fork the repository- Social features (share reflections)

2. Create a feature branch: `git checkout -b feature/YourFeature`- AI-powered trade insights

3. Commit changes: `git commit -m "Add feature"`

4. Push to branch: `git push origin feature/YourFeature`## Contributing

5. Open a Pull Request

6. Fork the repo

## License2. Create a branch: git checkout -b feature/YourFeature

3. Commit: git commit -m "Add feature"

Private / Proprietary4. Push: git push origin feature/YourFeature

5. Open a Pull Request

---

## License

Built by the TherellWalker Team

Private / proprietary

## Developer

Built by the TherellWalker Team

---
