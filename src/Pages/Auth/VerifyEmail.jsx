import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const VerifyEmailPage = () => {
    const { verifyEmail, isAuthLoading, authError, currentUser } = useAuthStore();
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            verifyEmail(token);
        }
    }, [token, verifyEmail]);

    useEffect(() => {
        if (currentUser?.isVerified && !isAuthLoading && !authError) {
            const timer = setTimeout(() => {
                navigate("/");
                toast.success("Email verified successfully!");
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [currentUser, isAuthLoading, authError, navigate]);

    const renderContent = () => {
        if (isAuthLoading) {
            return (
                <div className="text-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "linear",
                        }}
                        className="w-16 h-16 mx-auto mb-6 text-primary-600 dark:text-accent-500"
                    >
                        <Loader2 className="w-full h-full" />
                    </motion.div>
                    <h2 className="text-2xl font-bold mb-2">Verifying Your Email</h2>
                    <p className="text-secondary-600 dark:text-secondary-400">
                        Please wait while we verify your email address...
                    </p>
                </div>
            );
        }

        if (authError) {
            return (
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 text-red-500">
                        <AlertCircle className="w-full h-full" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                        {authError || "Invalid or expired verification link."}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 text-white rounded-full font-medium transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return (
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 mx-auto mb-6 text-green-500"
                >
                    <CheckCircle className="w-full h-full" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
                <p className="text-secondary-600 dark:text-secondary-400">
                    Your email has been successfully verified.
                </p>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Redirecting to home page...
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white dark:bg-secondary-800 rounded-2xl shadow-lg p-8"
            >
                <div className="flex flex-col items-center px-6 py-8">
                    <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
                        AnimateHub
                    </h1>
                    <div className="flex flex-col items-center space-y-4">
                        {renderContent()}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default VerifyEmailPage;