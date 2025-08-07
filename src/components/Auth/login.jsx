import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import BackButton from "../BackButton";

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
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
      <BackButton />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-slate-900 p-8 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full p-2 bg-gray-800 text-white rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="mt-1 w-full p-2 bg-gray-800 text-white rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-sm text-right mt-1">
              <span
                className="text-indigo-400 cursor-pointer"
                onClick={() => navigate("/forgotpassword")}
                >
                Forgot Password?
              </span>
              </p>

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
              >
                {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>

        <div className="mt-4 flex flex-col items-center">
          <p className="mb-2">Or</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
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
              className="text-indigo-400 cursor-pointer"
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