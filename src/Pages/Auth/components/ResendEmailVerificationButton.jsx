import { useAuthStore } from "../../../store/authStore";
import { motion } from "framer-motion";
import { RotateCw, Mail } from "lucide-react";

const ResendEmailVerificationButton = () => {
    const { resendVerificationEmail, isAuthLoading } = useAuthStore();

    return (
        <div className="text-center mt-4 space-y-2">
            <motion.button
                onClick={resendVerificationEmail}
                disabled={isAuthLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                    px-6 py-2.5 rounded-lg font-medium text-sm
                    ${isAuthLoading
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 text-white"
                    } 
                    transition-all duration-200
                    flex items-center justify-center gap-2 mx-auto
                `}
            >
                {isAuthLoading ? (
                    <>
                        <RotateCw className="w-4 h-4 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        <Mail className="w-4 h-4" />
                        Resend Verification Email
                    </>
                )}
            </motion.button>
        </div>
    );
};

export default ResendEmailVerificationButton;