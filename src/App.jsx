import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Layout & UI components
import Navbar from "./components/layout/Navbar";
import Chatbot from "./components/layout/Chatbot";
import Footer from "./components/layout/Footer";
import SplashCursor from "./components/SplashCursor";
import BackToTop from "./components/UI/BackToTop";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";

// Middleware
import ProtectedRoute from "./Pages/Auth/ProtectedRoute";
import AppProvider from "./providers/AppProvider";

// Pages
import HomePage from "./Pages/Home/HomePage";
import AboutUs from "./Pages/About/AboutUs";
import ContactUs from "./Pages/Contact/ContactUs";
import Leaderboard from "./Pages/Leaderboard/LeaderBoard";
import AnimationPlayground from "./Pages/AnimationPlayground";
import Blog from "./Pages/BlogPage";
import AddBlogPage from "./Pages/AddBlogPage";
import ChallengeMode from "./Pages/challenge/ChallengeMode";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Contributors from "./Pages/Contributors/Contributors";
import PaymentPage from "./Pages/Payment/Payment";
import TemplatesRoutes from "./components/Templates/TemplatesRoutes";
import LoginPage from "./Pages/Auth/LoginPage";
import SignupPage from "./Pages/Auth/SignUpPage";
import FavoritesPage from "./Pages/Favorites/FavoritesPage";
import VerifyEmail from "./Pages/Auth/VerifyEmail";
import OTPVerificationPage from "./Pages/Auth/OTPVerificationPage";
import ResetPasswordPage from "./Pages/Auth/ResetPasswordPage";
import MySnippet from "./Pages/Dashboard/MySnippet";

import ComponentsPage from "./Pages/Components/ComponentsPage";
import IntroductionPage from "./Pages/Components/staticPages/IntroductionPage";
import InstallationPage from "./Pages/Components/staticPages/InstallationPage";

import Playground from "./Pages/Playground/Code_Playground";
import FramerPlayground from "./Pages/Playground/FramerPlayground";
import ColorGradientPlayground from "./Pages/Playground/ColorGradientPlayground";
import TailwindPlayground from "./Pages/Playground/TailwindPlayground";
import SVGPlayground from "./Pages/Playground/SVGPlayground";
import FontPlayground from "./Pages/Playground/FontPlayground";
import FlexboxPlayground from "./Pages/Playground/FlexboxPlayground";
import GridPlayground from "./Pages/Playground/GridPlayground";
import BoxShadowPlayground from "./Pages/Playground/BoxShadowPlayground";

import ContributorGuide from "./Pages/Contributors/ContributorGuide";
import ProfilePage from "./Pages/Profile/ProfilePage";
import PalettesPage from "./Pages/Profile/PalettesPage";
import Resourcehub from "./Pages/Profile/Resourcehub";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import TransformPlayground from "./Pages/Playground/TransformPlayground";

// -----------------------------------
// Layout component that wraps all pages
// -----------------------------------
function Layout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen transition-all duration-300 ease-in-out">
        <Outlet />
      </main>
      <Chatbot />
      <Footer />
      <BackToTop />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

// -----------------------------------
// App Component - Level 3 Improvements
// -----------------------------------
function App() {
  return (
    <AppProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {/* UX Enhancements */}
        <SplashCursor />
        <ScrollToTop />

        <Routes>
          {/* Primary layout wrapper */}
          <Route element={<Layout />}>
            {/* Home & Info Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* Components & Playground Routes */}
            <Route path="/components" element={<ComponentsPage />}>
              <Route path="introduction" element={<IntroductionPage />} />
              <Route path="installation" element={<InstallationPage />} />
            </Route>
            <Route path="/explore" element={<Dashboard />} />
            <Route path="/about" element={<AboutUs />} />
            <Route
              path="/animationplayground"
              element={<AnimationPlayground />}
            />
            <Route path="/challenge" element={<ChallengeMode />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/add" element={<AddBlogPage />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/framerplayground" element={<FramerPlayground />} />
            <Route path="/ColorGradientPlayground" element={<ColorGradientPlayground />} />
            <Route path="/TailwindPlayground" element={<TailwindPlayground />} />
            <Route path="/SVGPlayground" element={<SVGPlayground />} />
            <Route path="/FontPlayground" element={<FontPlayground />} />
            <Route path="/flexboxPlayground" element={<FlexboxPlayground />} />
            <Route path="/gridPlayground" element={<GridPlayground />} />
            <Route path="/TransformPlayground" element={<TransformPlayground />} />
            <Route path="/animationplayground" element={<AnimationPlayground />} />

            {/* Dashboard & Challenge Mode */}
            <Route path="/explore" element={<Dashboard />} />
            <Route path="/challenge" element={<ChallengeMode />} />

            <Route path="/FontPlayground" element={<FontPlayground/>}/>
            <Route path="/flexboxPlayground" element={<FlexboxPlayground/>}/>
            <Route path="/gridPlayground" element={<GridPlayground/>}/>
            <Route path="/boxShadowPlayground" element={<BoxShadowPlayground/>}/>









            <Route path="/leaderboard" element={<Leaderboard />} />

            {/* Contributor Pages */}
            <Route path="/contributors" element={<Contributors />} />
            <Route path="/contributor-guide" element={<ContributorGuide />} />

            {/* Templates & Payment */}
            <Route path="/templates/*" element={<TemplatesRoutes />} />
            <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
            <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
            <Route path="/my-snippets" element={<MySnippet />} />

            {/* Auth */}
            <Route path="/sign-in" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify-otp" element={<OTPVerificationPage />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

            {/* Profile */}
            <Route path="/profile/:username" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/palettes" element={<PalettesPage />} />
            <Route path="/resourcehub" element={<Resourcehub />} />

            {/* Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>

        {/* Analytics & Performance Monitoring */}
        <Analytics />
      </Router>

      <SpeedInsights />
    </AppProvider>
  );
}

export default App;