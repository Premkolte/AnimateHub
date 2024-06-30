import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BackButton from "../BackButton";

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
     <BackButton/>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-slate-900 p-8 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center">Sign Up</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 w-full p-2 bg-gray-800 text-white rounded"
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
              className="mt-1 w-full p-2 bg-gray-800 text-white rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full p-2 bg-gray-800 text-white rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg font-semibold"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-400 cursor-pointer"
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
