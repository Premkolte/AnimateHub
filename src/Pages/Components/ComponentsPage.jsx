import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ComponentsSideBar from "./components/ComponentsSideBar";

const ComponentsPage = () => {
    const location = useLocation();
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-secondary-900">
            <div className="flex min-h-[calc(100vh-4rem)]">
                <ComponentsSideBar />
                
                <main className="flex-1 p-8">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6"
                    >
                        <Outlet />
                        
                        {location.pathname === '/components' && (
                            <div className="text-center py-12">
                                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                                    Welcome to Components
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                                    Select a component from the sidebar to view its details, usage examples, and code snippets.
                                    Start building beautiful UIs with our collection of pre-built, customizable components.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <a
                                        href="#introduction"
                                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Get Started
                                    </a>
                                    <a
                                        href="https://github.com/Premkolte/AnimateHub"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        View on GitHub
                                    </a>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default ComponentsPage;