import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { Loader2 } from "lucide-react";

const AuthProvider = ({ children }) => {
    const { fetchCurrentUser, initialFetch } = useAuthStore();

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <>
            {initialFetch ? children : (
                // TODO: If someone can come up with a better loader component, feel free to implement it.
                // Disclaimer: The loader should follow the overall app UI style and be clean and visually appealing.
                <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6">
                    <div className="py-4 w-full h-full rounded-full flex items-center justify-center">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Please wait</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
                        Getting things ready for you...
                    </p>
                </div>
            )}
        </>
    );
};

export default AuthProvider;