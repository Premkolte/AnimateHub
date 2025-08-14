import { HashRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import "@fortawesome/fontawesome-free/css/all.min.css";

// Import Layout --------------------------
import Navbar from "./components/layout/Navbar";
import Chatbot from "./components/layout/Chatbot";
import Footer from "./components/layout/Footer";
import SplashCursor from "./components/SplashCursor";
import BackToTop from "./components/UI/BackToTop";
import { Toaster } from "react-hot-toast";


// Middleware -------------------------------
import ProtectedRoute from "./Pages/Auth/ProtectedRoute";
import AppProvider from "./providers/AppProvider";



// Import pages ---------------------------
import HomePage from "./Pages/Home/HomePage";
import AboutUs from "./Pages/About/AboutUs";
import ContactUs from "./Pages/Contact/ContactUs";
import Dashboard from "./Pages/Dashboard/Dashboard"
import Contributors from "./Pages/Contributors/Contributors";
import PaymentPage from "./Pages/Payment/Payment";
import TemplatesRoutes from "./components/Templates/TemplatesRoutes";
import LoginPage from "./Pages/Auth/LoginPage";
import SignupPage from "./Pages/Auth/SignUpPage";
import FavoritesPage from "./Pages/Favorites/FavoritesPage";
import ForgotPasswordPage from "./Pages/Auth/ForgotPasswordPage";

// Layout component that includes Navbar, Footer and an Outlet
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Chatbot />
      <Footer />
      <BackToTop />
      <Toaster />
    </>
  );
}

function App() {
  return (
    <AppProvider>

      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SplashCursor />

        <Routes>
          {/* Wrap all primary pages with Layout and use Outlet inside */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/explore" element={<Dashboard />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/contributors" element={<Contributors />} />
            <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
            <Route path="/templates/*" element={<TemplatesRoutes />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />

            <Route path="/sign-in" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

        </Routes>

        <Analytics />
      </Router>
    </AppProvider>

  );
}

export default App;