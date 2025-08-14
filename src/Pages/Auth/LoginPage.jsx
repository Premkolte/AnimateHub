import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { User, Lock } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { handleLogin, isAuthLoading, authError, currentUser } = useAuthStore();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };




  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(loginData);

  };

  const handleGoogleSignIn = () => {
    // Google sign-in can be implemented later if needed
    alert("Google sign-in is currently not available");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (currentUser) navigate("/");
    console.log(currentUser)
  }, [currentUser])


  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-gradient-to-br from-white via-primary-25 to-primary-50 dark:from-secondary-900 dark:via-secondary-850 dark:to-secondary-800 text-secondary-900 dark:text-white p-6">
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

      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-600 to-primary-800 dark:from-accent-400 dark:to-accent-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 text-lg">
            Sign in to continue your journey
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
            <h2 className="text-2xl font-bold text-center mb-2">Sign In</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-primary-700 dark:from-accent-500 dark:to-accent-700 mx-auto rounded-full"></div>
          </motion.div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label htmlFor="username" className="block text-sm font-semibold mb-2 text-secondary-700 dark:text-secondary-300">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500 w-5 h-5" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full pl-12 pr-4 py-4 border-2 border-primary-100 dark:border-accent-600/30 dark:bg-secondary-700/50 text-secondary-900 dark:text-white rounded-xl focus:border-primary-500 dark:focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-primary-200/30 dark:focus:ring-accent-500/20 transition-all duration-300 placeholder-secondary-400 dark:placeholder-secondary-500"
                  value={loginData.username}
                  onChange={onChangeHandler}
                  placeholder="Enter your username"
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
                  value={loginData.password}
                  onChange={onChangeHandler}
                  placeholder="Enter your password"
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
              <div className="mt-3 text-right">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-sm text-primary-600 dark:text-accent-500 cursor-pointer hover:underline font-medium transition-all duration-200"
                  onClick={() => navigate("/forgotpassword")}
                >
                  Forgot Password?
                </motion.span>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isAuthLoading}
              className={`w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-accent-600 dark:to-accent-700 dark:hover:from-accent-700 dark:hover:to-accent-800 text-white px-6 py-4 rounded-xl text-lg font-bold shadow-lg shadow-primary-500/25 dark:shadow-accent-500/25 transition-all duration-300 relative overflow-hidden ${isAuthLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <span className="relative z-10">
                {isAuthLoading ? 'Signing in...' : 'Sign In'}
              </span>
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
              onClick={() => alert("Google signup is currently not available")}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center p-4 rounded-xl shadow-md transition-all duration-300 font-semibold"
            >
              <FcGoogle className="mr-3 text-xl" />
              Continue with Google (Coming Soon)
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <p className="text-secondary-600 dark:text-secondary-400">
              Don't have an account?{" "}
              <motion.span
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/signup")}
                className="text-primary-600 dark:text-accent-500 cursor-pointer font-semibold hover:underline transition-all duration-200"
              >
                Sign up here
              </motion.span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;