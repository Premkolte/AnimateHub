import React, { useEffect, useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { User, Mail, Lock, CheckCircle } from "lucide-react";
import BackButton from "../BackButton";

const SignupPage = () => {
  const navigate = useNavigate();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded || pendingVerification) return;

    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: name,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error("Sign up error:", err);
      alert(err.errors?.[0]?.message || "Something went wrong");
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      await setActive({ session: result.createdSessionId });
      navigate("/");
    } catch (err) {
      console.error("Verification failed:", err);
      alert(err.errors?.[0]?.message || "Invalid verification code");
    }
  };

  const handleGoogleSignUp = async () => {
    if (!isLoaded) return;

    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
      });
    } catch (err) {
      console.error("Google sign-up error:", err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="w-full flex flex-col items-center min-h-fit bg-gradient-to-br from-white via-primary-25 to-primary-50 dark:from-secondary-900 dark:via-secondary-850 dark:to-secondary-800 text-secondary-900 dark:text-white p-6">
      {/* Background decorative elements */}
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
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-xl"
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
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center space-y-8 py-8 h-fit">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-600 to-primary-800 dark:from-accent-400 dark:to-accent-600 bg-clip-text text-transparent">
            Join Us Today
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 text-lg">
            Create your account and start your journey
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/80 dark:bg-secondary-800/90 backdrop-blur-sm text-secondary-900 dark:text-white border border-primary-200/50 dark:border-secondary-700/50 p-8 rounded-2xl shadow-2xl shadow-primary-200/20 dark:shadow-secondary-900/50 max-w-md w-full"
        >
          {!pendingVerification ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
                <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-primary-700 dark:from-accent-500 dark:to-accent-700 mx-auto rounded-full"></div>
              </motion.div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 text-secondary-700 dark:text-secondary-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500 w-5 h-5" />
                    <input
                      type="text"
                      id="name"
                      className="w-full pl-12 pr-4 py-4 border-2 border-primary-100 dark:border-accent-600/30 dark:bg-secondary-700/50 text-secondary-900 dark:text-white rounded-xl focus:border-primary-500 dark:focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-primary-200/30 dark:focus:ring-accent-500/20 transition-all duration-300 placeholder-secondary-400 dark:placeholder-secondary-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/5 to-transparent pointer-events-none"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 text-secondary-700 dark:text-secondary-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      className="w-full pl-12 pr-4 py-4 border-2 border-primary-100 dark:border-accent-600/30 dark:bg-secondary-700/50 text-secondary-900 dark:text-white rounded-xl focus:border-primary-500 dark:focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-primary-200/30 dark:focus:ring-accent-500/20 transition-all duration-300 placeholder-secondary-400 dark:placeholder-secondary-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/5 to-transparent pointer-events-none"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <label htmlFor="password" className="block text-sm font-semibold mb-2 text-secondary-700 dark:text-secondary-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500 w-5 h-5" />
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password-input"
                      className="w-full pl-12 pr-12 py-4 border-2 border-primary-100 dark:border-accent-600/30 dark:bg-secondary-700/50 text-secondary-900 dark:text-white rounded-xl focus:border-primary-500 dark:focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-primary-200/30 dark:focus:ring-accent-500/20 transition-all duration-300 placeholder-secondary-400 dark:placeholder-secondary-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      required
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-primary-600 dark:hover:text-accent-500 transition-colors duration-200 p-1"
                    >
                      {passwordVisible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </motion.button>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/5 to-transparent pointer-events-none"></div>
                  </div>
                </motion.div>

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
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-accent-600 dark:to-accent-700 dark:hover:from-accent-700 dark:hover:to-accent-800 text-white px-6 py-4 rounded-xl text-lg font-bold shadow-lg shadow-primary-500/25 dark:shadow-accent-500/25 transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10">Create Account</span>
                  <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </motion.button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <CheckCircle className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold mb-2">Check Your Email</h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  We've sent a verification code to your email address
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleVerification}>
                <div>
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="w-full p-4 border-2 border-primary-100 dark:border-accent-600/30 dark:bg-secondary-700/50 text-secondary-900 dark:text-white rounded-xl focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-200/30 transition-all duration-300 text-center text-lg font-mono tracking-wider"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-4 rounded-xl font-bold text-lg shadow-lg shadow-green-500/25 transition-all duration-300"
                >
                  Verify & Complete
                </motion.button>
              </form>
            </motion.div>
          )}

          {!pendingVerification && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mt-8"
              >
                <div className="relative flex items-center justify-center mb-6">
                  <div className="border-t border-secondary-200 dark:border-secondary-700 flex-1"></div>
                  <span className="bg-white dark:bg-secondary-800 px-4 text-sm text-secondary-500 dark:text-secondary-400 font-medium whitespace-nowrap">
                    or continue with
                  </span>
                  <div className="border-t border-secondary-200 dark:border-secondary-700 flex-1"></div>
                </div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleSignUp}
                  className="w-full bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center p-4 rounded-xl shadow-md transition-all duration-300 font-semibold"
                >
                  <FcGoogle className="mr-3 text-xl" />
                  Continue with Google
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="mt-8 text-center"
              >
                <p className="text-secondary-600 dark:text-secondary-400">
                  Already have an account?{" "}
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate("/sign-in")}
                    className="text-primary-600 dark:text-accent-500 cursor-pointer font-semibold hover:underline transition-all duration-200"
                  >
                    Sign in here
                  </motion.span>
                </p>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;