import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";
import { Loader2, CheckCircle, AlertCircle, Lock, Eye, EyeOff } from "lucide-react";

const ResetPasswordPage = () => {
    const { resetPassword, isAuthLoading, authError, successfullyResetPassword } = useAuthStore();
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }
        resetPassword(formData.password, token);
    };

    useEffect(() => {
        if (successfullyResetPassword) {
            setTimeout(() => navigate("/sign-in"), 2000);
        }
    }, [successfullyResetPassword]);


    const renderForm = () => (
        <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter new password"
                        required
                        minLength={6}
                    />
                    <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type={passwordVisible ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Confirm new password"
                        required
                        minLength={6}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
            >
                {isAuthLoading ? (
                    <>
                        <Loader2 className="animate-spin mr-2 h-5 w-5" />
                        Resetting Password...
                    </>
                ) : (
                    "Reset Password"
                )}
            </button>
        </form>
    );

    const renderContent = () => {
        if (successfullyResetPassword) {
            return (
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-16 h-16 mx-auto text-green-500"
                    >
                        <CheckCircle className="w-full h-full" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Password Reset Successful!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Your password has been updated successfully. Redirecting to login...
                    </p>
                </div>
            );
        }

        if (authError) {
            return (
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto text-red-500">
                        <AlertCircle className="w-full h-full" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Reset Failed
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        {authError || "The password reset link is invalid or has expired."}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Reset Your Password
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Enter a new password for your account
                    </p>
                </div>
                {renderForm()}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
                <div className="flex justify-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-accent-400 dark:to-indigo-400 bg-clip-text text-transparent">
                        AnimateHub
                    </h1>
                </div>
                {renderContent()}
            </motion.div>
        </div>
    );
};

export default ResetPasswordPage;