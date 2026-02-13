import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Shield } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

const OTPVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP, resendOTP, isAuthLoading, authError } = useAuthStore();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      toast.error("Email not found. Please sign up again.");
      navigate("/signup");
    }
  }, [location.state, navigate]);

  useEffect(() => {
    let timer;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    const success = await verifyOTP(email, otpCode);
    if (success) {
      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    const success = await resendOTP(email);
    if (success) {
      setCountdown(30);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      toast.success("New OTP sent to your email");
    }
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-gradient-to-br from-white via-primary-25 to-primary-50 dark:from-secondary-900 dark:via-secondary-850 dark:to-secondary-800 text-secondary-900 dark:text-white p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-xl bg-primary-500/30"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full blur-xl bg-accent-500/30"
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen space-y-8 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 dark:from-accent-500 dark:to-accent-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-600 to-primary-800 dark:from-accent-400 dark:to-accent-600 bg-clip-text text-transparent">
            Verify Email
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 text-lg">
            Enter the 6-digit code sent to your email
          </p>
          <p className="text-secondary-500 dark:text-secondary-500 text-sm">
            {email}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full bg-white/80 dark:bg-secondary-800/90 backdrop-blur-sm text-secondary-900 dark:text-white border border-primary-200/50 dark:border-secondary-700/50 p-8 rounded-2xl shadow-2xl shadow-primary-200/20 dark:shadow-secondary-900/50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-center mb-2">Email Verification</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-primary-700 dark:from-accent-500 dark:to-accent-700 mx-auto rounded-full"></div>
          </motion.div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="flex justify-center gap-2 md:gap-3">
              {otp.map((digit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                >
                  <input
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold border-2 border-primary-200 dark:border-accent-600/30 dark:bg-secondary-700/50 text-secondary-900 dark:text-white rounded-xl focus:border-primary-500 dark:focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-primary-200/30 dark:focus:ring-accent-500/20 transition-all duration-300"
                    required
                  />
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isAuthLoading || otp.join("").length !== 6}
              className={`w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-accent-600 dark:to-accent-700 dark:hover:from-accent-700 dark:hover:to-accent-800 text-white px-6 py-4 rounded-xl text-lg font-bold shadow-lg shadow-primary-500/25 dark:shadow-accent-500/25 transition-all duration-300 relative overflow-hidden ${isAuthLoading || otp.join("").length !== 6 ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isAuthLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                <span className="relative z-10">Verify Email</span>
              )}
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.button>

            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
              >
                {authError}
              </motion.div>
            )}

            <div className="text-center space-y-3">
              <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                Didn't receive the code?
              </p>
              <motion.button
                type="button"
                whileHover={{ scale: canResend ? 1.05 : 1 }}
                whileTap={{ scale: canResend ? 0.95 : 1 }}
                onClick={handleResendOtp}
                disabled={!canResend || isAuthLoading}
                className={`text-sm font-medium transition-all duration-200 ${
                  canResend
                    ? "text-primary-600 dark:text-accent-500 hover:underline cursor-pointer"
                    : "text-secondary-400 dark:text-secondary-600 cursor-not-allowed"
                }`}
              >
                {canResend ? "Resend OTP" : `Resend in ${countdown}s`}
              </motion.button>
            </div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="mt-8 text-center"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/signup")}
              className="flex items-center justify-center gap-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-accent-500 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Sign Up</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
