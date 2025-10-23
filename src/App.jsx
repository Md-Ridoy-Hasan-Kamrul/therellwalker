import { AuthProvider } from './context/AuthContext';
import { TradeProvider } from './context/TradeContext';
import { AppRoutes } from './routes/AppRoutes';
// FIX: 'Toaster' er bodole 'ToastContainer' import kora hoyeche
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <TradeProvider>
        <AppRoutes />
        {/* FIX: Component er name 'ToastContainer' hobe */}
        <ToastContainer position='bottom-right' autoClose={3000} theme='dark' />
      </TradeProvider>
    </AuthProvider>
  );
}

export default App;
