import React from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const OptionalAuth = ({ children, requiresAuth = false, feature = "feature" }) => {
  if (!requiresAuth) {
    return children;
  }

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div className="relative">
          {/* Show a blurred/limited version */}
          <div className="filter blur-sm pointer-events-none opacity-50">
            {children}
          </div>
          
          {/* Overlay with sign-in prompt */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-sm mx-4">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Premium {feature}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Sign in to access this premium feature and more!
              </p>
              <div className="space-y-2">
                <Link
                  to="/sign-in"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 block"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-md transition duration-200 block"
                >
                  Sign Up Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
};

export default OptionalAuth;
