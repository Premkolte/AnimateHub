import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Load environment variables with safe fallbacks
const PUBLISHABLE_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
  "pk_test_YWRlcXVhdGUtcG9sbGl3b2ctMzUuY2xlcmsuYWNjb3VudHMuZGV2JA";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

// Warn if using fallback values
if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  console.warn("⚠️ Using fallback Clerk test key. Set VITE_CLERK_PUBLISHABLE_KEY in .env for production.");
}

if (!GOOGLE_CLIENT_ID) {
  console.warn("⚠️ Google OAuth disabled. Set VITE_GOOGLE_CLIENT_ID in .env to enable Google Sign-In.");
}

// Wrapper component that conditionally includes GoogleOAuthProvider
const AppWithProviders = () => {
  const appContent = <App />;
  
  // Only wrap with GoogleOAuthProvider if we have a valid client ID
  if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID.includes('.apps.googleusercontent.com')) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {appContent}
      </GoogleOAuthProvider>
    );
  }
  
  return appContent;
};

// Render root safely
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("❌ Root element not found. Check index.html for <div id='root'></div>");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AppWithProviders />
    </ClerkProvider>
  </React.StrictMode>
);

