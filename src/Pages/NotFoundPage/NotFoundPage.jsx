import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome, FaSearch } from "react-icons/fa";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white p-6">
            <div className="text-center max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-primary-500 dark:text-accent-500">
                        404
                    </h1>
                    <h2 className="text-4xl font-bold mt-4">Oops! Page Not Found</h2>
                    <p className="text-xl mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        The page you're looking for doesn't exist or has been moved. Let's get you back on track!
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 mt-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 rounded-full bg-primary-500 hover:bg-primary-600 dark:bg-accent-500 dark:hover:bg-accent-600 px-8 py-4 text-lg font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        <FaArrowLeft /> Go Back
                    </button>

                    <Link to="/">
                        <button
                            className="flex items-center gap-2 rounded-full border-2 border-primary-500 dark:border-accent-500 bg-transparent px-8 py-4 text-lg font-semibold text-primary-500 dark:text-accent-400 hover:bg-primary-50 dark:hover:bg-accent-50/10 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                        >
                            <FaHome /> Go Home
                        </button>
                    </Link>

                    <Link to="/explore">
                        <button
                            className="flex items-center gap-2 rounded-full bg-secondary-800 dark:bg-secondary-700 text-white px-8 py-4 text-lg font-semibold shadow hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-secondary-700 dark:hover:bg-secondary-600"
                        >
                            <FaSearch /> Browse Components
                        </button>
                    </Link>
                </div>

                <div className="mt-16 text-gray-500 dark:text-gray-400 text-sm">
                    <p>Still can't find what you're looking for? <a href="mailto:support@animatehub.com" className="text-primary-500 dark:text-accent-400 hover:underline">Contact Support</a></p>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;