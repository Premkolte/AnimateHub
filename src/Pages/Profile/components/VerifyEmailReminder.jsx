import React, { useState } from "react";
import { AlertCircle, Mail, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../../store/authStore";

const VerifyEmailReminder = ({ email }) => {
  const [isLoading, setIsLoading] = useState(false);
  const resendVerificationEmail = useAuthStore(state => state.resendVerificationEmail);

  const handleResendVerification = async () => {
    try {
      setIsLoading(true);
      await resendVerificationEmail();
    } catch (error) {
      console.error('Error resending verification email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative p-4 mb-6 rounded-xl bg-primary-100 dark:bg-secondary-800 border border-primary-200 dark:border-secondary-700 shadow-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          <AlertCircle className="h-5 w-5 text-primary-600 dark:text-blue-400" />
        </div>
        <div className="ml-3 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Verify your email</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Please verify your email address to unlock all features.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResendVerification}
              disabled={isLoading}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-primary-600 dark:bg-primary-500 text-white shadow-sm hover:shadow-md hover:bg-primary-700 dark:hover:bg-primary-600 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="-ml-0.5 mr-1.5 h-4 w-4" />
                  Resend Email
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailReminder;
