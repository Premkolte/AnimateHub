import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, setActive, isLoaded } = useSignIn();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/"); // redirect to home page after login
      } else {
        console.log("Additional steps required:", result);
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert(err.errors?.[0]?.message || "Login failed");
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: window.location.origin + "/", //  redirects back to your home
      });
    } catch (err) {
      console.error("Google sign-in error:", err);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white p-6 space-y-16 py-24">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-primary-50 dark:bg-secondary-800 text-secondary-900 dark:text-white border border-primary-200 dark:border-secondary-700 p-8 rounded-lg shadow-sm max-w-sm w-full"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="mt-1 w-full p-2 border border-primary-100 dark:border-accent-600 dark:bg-gray-800 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password-input"
                className="mt-1 w-full p-2 border border-primary-100 dark:border-accent-600 dark:bg-gray-800 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary-600 dark:hover:text-accent-500 transition-colors duration-200"
              > 
                {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            <p className="text-sm text-right mt-2">
              <span className="text-primary-600 dark:text-accent-500 cursor-pointer hover:underline" onClick={() => navigate("/forgotpassword")}>
                Forgot Password?
              </span>
            </p>
          </div>
          <button
            type="submit" 
            className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-colors duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-4 flex flex-col items-center">
          <p className="mb-2">Or</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleGoogleSignIn} 
            className="w-full bg-white text-black flex items-center justify-center p-3 rounded-lg shadow-md hover:bg-gray-100"
          >
            <FcGoogle className="mr-2" />
            Sign in with Google
          </motion.button>
        </div>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-primary-600 dark:text-accent-500 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;