import React, { useState, useEffect } from "react";
import { useSignIn, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const { signIn, isLoaded } = useSignIn();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
      <div className="bg-slate-900 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <button className="text-sm mb-2 text-left" onClick={() => navigate(-1)}>← Back</button>
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isCodeSent ? "Reset Password" : "Forgot Password"}
        </h1>

        {!isCodeSent ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg font-semibold"
            >
              Send Code
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="text"
              placeholder="Enter verification code"
              value={code}
              required
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded"
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold"
            >
              Reset Password
            </button>
          </form>
        )}

        {status && <p className="mt-4 text-sm text-yellow-400 text-center">{status}</p>}
        <p
          onClick={() => navigate("/sign-in")}
          className="mt-4 text-sm text-indigo-400 cursor-pointer text-center"
        >
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;