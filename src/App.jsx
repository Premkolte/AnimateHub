import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import HomePage from "./components/Home/HomePage";
import AboutUs from "./components/About/AboutUs";
import ContactUs from "./components/Contact/ContactUs";
import AnimatedCursor from "react-animated-cursor";
import Dashboard from "./components/Dashboard/Dashboard";
import Contributors from "./components/Contributors/Contributors";
import PaymentPage from "./components/Payment/Payment";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TemplatesRoutes from "./components/Templates/TemplatesRoutes";
import LoginPage from "./components/Auth/login";
import SignupPage from "./components/Auth/SignUp";

function App() {
  return (
    <ThemeProvider attribute="class">
      <Router>
        <AnimatedCursor
          innerSize={12}
          outerSize={25}
          outerAlpha={0.4}
          innerScale={1}
          outerScale={2}
          color="194, 198, 204"
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<Dashboard />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/contributors" element={<Contributors />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/templates/*" element={<TemplatesRoutes />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/SignUp" element={<SignupPage/>} />
        </Routes>
        <Analytics />
      </Router>
    </ThemeProvider>
  );
}

export default App;
