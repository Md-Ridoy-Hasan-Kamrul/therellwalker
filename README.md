#  TherellWalker - Trading Journal Application

A professional trading journal platform designed to help traders track, analyze, and improve their trading performance through comprehensive trade logging and reflection features.

##  Features

### Authentication System

- **Secure Login & Registration** - Complete user authentication with email verification
- **Password Recovery** - Multi-step password reset flow with OTP verification
- **Protected Routes** - Secure access control for authenticated users
- **OAuth Integration** - Google sign-in support for seamless authentication

### Trading Management

- **Trade Entry** - Log trades with detailed information
- **Trade Log** - View and manage all trading history
- **P&L Calculation** - Automatic profit and loss tracking
- **Reflections** - Document trading insights and learnings

### User Experience

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark Theme** - Professional dark purple gradient interface
- **Toast Notifications** - Real-time feedback for user actions
- **Form Validation** - React Hook Form for robust input handling

##  Tech Stack

### Frontend Framework

- **React 19.1.1** - Latest React with modern hooks and features
- **Vite 7.1.7** - Lightning-fast build tool and dev server
- **React Router DOM 6.30.1** - Client-side routing and navigation

### Styling & UI

- **Tailwind CSS 4.1.14** - Utility-first CSS framework with v4 features
- **React Icons 5.5.0** - Comprehensive icon library (Google, IoIcons)
- **Custom Design System** - Brand colors (Levender-10, Levender-20)
- **Google Fonts** - Lato, Open Sans, and Poppins typography

### Form Management

- **React Hook Form 7.65.0** - Performant form validation and state management
- **Custom Validation** - Email, password strength, and field matching rules

### HTTP & API

- **Axios 1.12.2** - Promise-based HTTP client
- **MSW 2.11.6** - Mock Service Worker for API mocking during development
- **Custom API Layer** - Centralized axios instance and endpoint management

### State Management

- **React Context API** - Global authentication state
- **Local Storage** - Persistent user session management
- **Custom Hooks** - `useAuth` for authentication logic

### Notifications

- **React Toastify 11.0.5** - Beautiful toast notifications for user feedback

### Development Tools

- **ESLint 9.36.0** - Code quality and consistency
- **Vite Plugin React** - Fast refresh and HMR
- **MSW** - API mocking for seamless development

##  Project Structure

```
therellwalker/
├── public/
│   └── mockServiceWorker.js          # MSW service worker
├── src/
│   ├── api/
│   │   ├── axiosInstance.js          # Configured axios instance
│   │   ├── httpEndpoints.js          # API endpoint definitions
│   │   └── httpMethods.js            # HTTP request methods
│   ├── assets/                        # Static assets
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthLayout.jsx        # Authentication layout wrapper
│   │   └── common/
│   │       ├── Button.jsx            # Reusable button component
│   │       ├── DashboardLayout.jsx   # Dashboard layout
│   │       ├── Header.jsx            # Application header
│   │       ├── Input.jsx             # Form input component
│   │       ├── MainLayout.jsx        # Main app layout
│   │       └── Sidebar.jsx           # Navigation sidebar
│   ├── context/
│   │   └── AuthContext.jsx           # Authentication context provider
│   ├── hooks/
│   │   └── useAuth.js                # Authentication hook
│   ├── mocks/
│   │   ├── browser.js                # MSW browser setup
│   │   └── handlers.js               # API mock handlers
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── CreateNewPassword.jsx # Reset password page
│   │   │   ├── CreatePassword.jsx    # Signup password creation
│   │   │   ├── EmailVerification.jsx # Email verification step
│   │   │   ├── ForgotPassword.jsx    # Password reset request
│   │   │   ├── Login.jsx             # User login page
│   │   │   ├── ResetPasswordOtp.jsx  # OTP verification for reset
│   │   │   ├── Signup.jsx            # User registration
│   │   │   └── VerifyOtp.jsx         # Signup OTP verification
│   │   └── dashboard/
│   │       ├── DashboardHome.jsx     # Dashboard overview
│   │       ├── Reflections.jsx       # Trading reflections
│   │       ├── TradeEntry.jsx        # New trade entry form
│   │       └── TradeLog.jsx          # Trade history log
│   ├── routes/
│   │   ├── AppRoutes.jsx             # Route configuration
│   │   └── ProtectedRoute.jsx        # Authentication guard
│   ├── utils/
│   │   └── calculatePnL.js           # P&L calculation utility
│   ├── App.jsx                        # Root application component
│   ├── index.css                      # Global styles & Tailwind
│   └── main.jsx                       # Application entry point
├── .eslintrc.js                       # ESLint configuration
├── index.html                         # HTML template
├── package.json                       # Project dependencies
├── tailwind.config.js                 # Tailwind customization
└── vite.config.js                     # Vite configuration
```

##  Design System

### Colors

- **Background:** `#0D061A` (Levender-10) - Deep purple background
- **Cards:** `#1B0C33` (Levender-20) - Elevated card background
- **Primary:** `#8B5CF6` / `#7C3AED` - Violet brand colors
- **Inputs:** `white/10` - Semi-transparent white overlays

### Typography

- **Headings:** Lato (600 - Semibold)
- **Body Text:** Open Sans (400 - Regular)
- **Buttons:** Lato (600 - Semibold)
- **Google Button:** Poppins (600 - Semibold)

##  Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd therellwalker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

##  Available Scripts

- **`npm run dev`** - Start development server with HMR
- **`npm run build`** - Build production-ready application
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint for code quality checks

##  Authentication Flow

### Signup Process

1. User enters first and last name → `/signup`
2. Email verification → `/email-verification`
3. OTP code entry → `/verify-otp`
4. Password creation → `/create-password`
5. Account created → Redirect to dashboard

### Login Process

1. User enters credentials → `/login`
2. Authentication validation
3. Session token stored → Redirect to dashboard

### Password Reset Flow

1. Forgot password request → `/forgot-password`
2. Email sent with OTP code
3. OTP verification → `/reset-password-otp`
4. Create new password → `/create-new-password`
5. Password updated → Redirect to login

##  Key Features Implementation

### Protected Routes

- Uses React Router's `ProtectedRoute` component
- Checks authentication status via `useAuth` hook
- Redirects unauthorized users to login page

### Form Validation

- React Hook Form for performant validation
- Real-time error feedback
- Password strength requirements (min 8 characters)
- Password confirmation matching

### API Integration

- Centralized axios instance with interceptors
- Mock API responses during development with MSW
- Error handling with toast notifications

### State Management

- AuthContext for global user state
- LocalStorage for session persistence
- Custom hooks for reusable logic

##  Future Enhancements

- [ ] Trade analytics and charts
- [ ] Performance metrics dashboard
- [ ] Export trade data (CSV, PDF)
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Mobile app version
- [ ] Social features (share reflections)
- [ ] AI-powered trade insights

##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

This project is private and proprietary.

##  Developer

Built with  by the TherellWalker Team

---

**Note:** This is a client project built with production-level architecture and modern best practices.
#   t h e r e l l w a l k e r _ - 5 0 0 _ W e b _ o p e r a 
 
 
