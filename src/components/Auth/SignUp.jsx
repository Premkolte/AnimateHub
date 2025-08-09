import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
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

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white p-6 space-y-16 ">
      <BackButton />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-primary-50 dark:bg-secondary-800 text-secondary-900 dark:text-white border border-primary-200 dark:border-secondary-700 p-8 rounded-lg shadow-sm max-w-sm w-full"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center">Sign Up</h1>

        {!pendingVerification ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 w-full p-2 border border-primary-100 dark:border-accent-600 dark:bg-secondary-700 text-secondary-900 dark:text-white rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full p-2 border border-primary-100 dark:border-accent-600 dark:bg-secondary-700 text-secondary-900 dark:text-white rounded"
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
                  id="password-input"
                  className="mt-1 w-full p-2 border border-primary-100 dark:border-accent-600 dark:bg-secondary-700 text-secondary-900 dark:text-white rounded"
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
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-colors duration-200"
            >
              Sign Up
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleVerification}>
            <p className="text-sm mb-2 text-center">
              A verification code has been sent to your email.
            </p>
            <input
              type="text"
              placeholder="Enter verification code"
              className="mt-1 w-full p-2 border border-primary-100 dark:border-accent-600 dark:bg-secondary-700 text-secondary-900 dark:text-white rounded"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold"
            >
              Verify and Complete Sign Up
            </button>
          </form>
        )}

        <div className="mt-4 flex flex-col items-center">
          <p className="mb-2">Or</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoogleSignUp}
            className="w-full bg-white text-black flex items-center justify-center p-3 rounded-lg shadow-md hover:bg-gray-100"
          >
            <FcGoogle className="mr-2" />
            Sign up with Google
          </motion.button>
        </div>

        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/sign-in")}
              className="text-primary-600 dark:text-accent-500 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
