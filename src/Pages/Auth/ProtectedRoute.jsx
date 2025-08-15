
import React, { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const { currentUser } = useAuthStore()

  return (
    <>

      {currentUser ? children
        :
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full mx-4 text-center">
            <div className="mb-6">
              <svg className="mx-auto h-16 w-16 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Authentication Required
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please sign in to access this feature and unlock the full potential of AnimateHub.
            </p>
            <div className="space-y-3">
              <Link
                to={"/sign-in"}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 block"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-lg transition duration-200 block"
              >
                Create Account
              </Link>
            </div>
            <div className="mt-4">
              <Link
                to="/"
                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      }

    </>
  );
};

export default ProtectedRoute;
