import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { User, Mail, Lock } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
const SignupPage = () => {
  const navigate = useNavigate();
  const { handleSignUp, handleGoogleSignin, isAuthLoading, currentUser, authError } = useAuthStore();

  const [signUpData, setSignUpData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [passwordActive, setPasswordActive] = useState(false);

  const [requirements, setRequirements] = useState({
    length: false,
    special: false,
    number: false,
    caps: false,
  });

  const onChangeHandler = (e) => {
    const updatedData = {
      ...signUpData,
      [e.target.name]: e.target.value,
    };
    setSignUpData(updatedData);
    if (e.target.name === 'password') {
      checkRequirements(updatedData.password);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const checkRequirements = (password) => {
    setRequirements({
      length: password.length >= 8,
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      number: /\d/.test(password),
      caps: /[A-Z]/.test(password),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, fullName, email, password } = signUpData;

    if (!username || !fullName || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long.");
      return;
    }

    const success = await handleSignUp(signUpData);
    if (success) {
      toast.success("Account created! Please check your email for OTP verification code.");
      navigate('/verify-otp', { state: { email } });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (currentUser) navigate("/");
    console.log(currentUser)
  }, [currentUser])

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
            {/* UserName */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label htmlFor="username" className="block text-sm font-semibold mb-2 text-secondary-700 dark:text-secondary-300">
                UserName
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500 w-5 h-5" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full pl-12 pr-4 py-4 border-2 border-primary-100 dark:border-accent-600/30 dark:bg-secondary-700/50 text-secondary-900 dark:text-white rounded-xl focus:border-primary-500 dark:focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-primary-200/30 dark:focus:ring-accent-500/20 transition-all duration-300 placeholder-secondary-400 dark:placeholder-secondary-500"
                  value={signUpData.username}
                  onChange={onChangeHandler}
                  placeholder="Enter your username"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/5 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label htmlFor="fullName" className="block text-sm font-semibold mb-2 text-secondary-700 dark:text-secondary-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500 w-5 h-5" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="w-full pl-12 pr-4 py-4 border-2 border-primary-100 dark:border-accent-600/30 dark:bg-secondary-700/50 text-secondary-900 dark:text-white rounded-xl focus:border-primary-500 dark:focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-primary-200/30 dark:focus:ring-accent-500/20 transition-all duration-300 placeholder-secondary-400 dark:placeholder-secondary-500"
                  value={signUpData.fullName}
                  onChange={onChangeHandler}
                  placeholder="Enter your full name"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/5 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Email */}
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
                  name="email"
                  className="w-full pl-12 pr-4 py-4 border-2 border-primary-100 dark:border-accent-600/30 dark:bg-secondary-700/50 text-secondary-900 dark:text-white rounded-xl focus:border-primary-500 dark:focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-primary-200/30 dark:focus:ring-accent-500/20 transition-all duration-300 placeholder-secondary-400 dark:placeholder-secondary-500"
                  value={signUpData.email}
                  onChange={onChangeHandler}
                  placeholder="Enter your email"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/5 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Password */}
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
                  id="password"
                  name="password"
                  className="w-full pl-12 pr-12 py-4 border-2 border-primary-100 dark:border-accent-600/30 dark:bg-secondary-700/50 text-secondary-900 dark:text-white rounded-xl focus:border-primary-500 dark:focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-primary-200/30 dark:focus:ring-accent-500/20 transition-all duration-300 placeholder-secondary-400 dark:placeholder-secondary-500"
                  value={signUpData.password}
                  onChange={onChangeHandler}
                  onFocus={() => setPasswordActive(true)}
                  onBlur={() => setPasswordActive(false)}
                  placeholder="Create a strong password"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-[30%] transform text-secondary-400 hover:text-primary-600 dark:hover:text-accent-500 transition-colors duration-200 p-1"
                >
                  {passwordVisible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </motion.button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/5 to-transparent pointer-events-none"></div>
              </div>
              {passwordActive && (
                <div className="mt-2 space-y-1">
                  <span className={`text-sm ${requirements.length ? 'text-green-500' : 'text-red-500'}`}>At least 8 characters</span>
                  <br />
                  <span className={`text-sm ${requirements.special ? 'text-green-500' : 'text-red-500'}`}>One special character</span>
                  <br />
                  <span className={`text-sm ${requirements.number ? 'text-green-500' : 'text-red-500'}`}>One number</span>
                  <br />
                  <span className={`text-sm ${requirements.caps ? 'text-green-500' : 'text-red-500'}`}>One uppercase letter</span>
                </div>
              )}
            </motion.div>

            {/* Submit Button */}
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
              disabled={isAuthLoading}
            >
              {isAuthLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                <span
                  className="relative z-10"
                  onClick={() => navigate('/sign-in')}
                >
                  Create Account
                </span>

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

          </form>

          {!isAuthLoading && (
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

                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    handleGoogleSignin(credentialResponse.credential);
                  }}
                  onError={(error) => {
                    console.error("Google Sign-In error:", error);
                  }}
                />
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