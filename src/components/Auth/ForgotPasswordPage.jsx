import React, { useState, useEffect } from "react";
import { useSignIn, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ForgotPasswordPage = () => {
  const { signIn, isLoaded } = useSignIn();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [status, setStatus] = useState("");

  // Sign out any existing session on load
  useEffect(() => {
    signOut().catch(() => {});
  }, []);

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setIsCodeSent(true);
      setStatus("Verification code sent to your email.");
    } catch (err) {
      console.error("Send code error:", err);
      setStatus(err.errors?.[0]?.message || "Something went wrong. Please try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (result.status === "complete") {
        setStatus("Password reset successful. Redirecting to login...");
        setTimeout(() => navigate("/sign-in"), 2000);
      } else {
        setStatus("Additional steps required.");
      }
    } catch (err) {
      console.error("Reset failed:", err);
      setStatus(err.errors?.[0]?.message || "Reset failed.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white p-6 space-y-16 py-24">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-primary-50 dark:bg-secondary-800 text-secondary-900 dark:text-white border border-primary-200 dark:border-secondary-700 p-8 rounded-lg shadow-sm max-w-sm w-full"
        >
          <h1 className="text-3xl font-extrabold mb-6 text-center">
            {isCodeSent ? "Reset Password" : "Forgot Password"}
          </h1>

          {!isCodeSent ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 w-full p-2 border border-primary-100 dark:border-accent-600 dark:bg-gray-800  rounded focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-accent-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-colors duration-200"
              >
                Send Code
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label htmlFor="code" className="block text-sm font-medium mb-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="code"
                  className="mt-1 w-full p-2 border border-primary-100 dark:border-accent-600 dark:bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-accent-500"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="new-password"
                    className="mt-1 w-full p-2 border border-primary-100 dark:border-accent-600 dark:bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-accent-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary-600 dark:hover:text-accent-500 transition-colors duration-200">
                    {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-colors duration-200"
              >
                Reset Password
              </button>
            </form>
          )}

          {status && <p className="mt-4 text-sm text-yellow-400 text-center">{status}</p>}
          <p
            onClick={() => navigate("/sign-in")}
            className="mt-4 text-sm text-primary-600 dark:text-accent-500 cursor-pointer text-center hover:underline"
          >
            Back to Login
          </p>
        </motion.div>

    </div>
  );
};

export default ForgotPasswordPage;