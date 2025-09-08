import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const InstallationPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
        >
            {/* Hero Section */}
            <section className="text-center py-12 bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    Install & Integrate UI Components Easily
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                    Choose any component from our collection and integrate it into your project in seconds.
                    All components are customizable and easy to adapt to your design system.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/components/grid"
                        className="px-6 py-3 bg-primary-600 dark:bg-accent-600 text-white rounded-md hover:bg-primary-700 dark:hover:bg-accent-700 transition-colors font-medium"
                    >
                        Browse Components
                    </Link>
                    <Link
                        to="/components/create"
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                    >
                        Share Your Component
                    </Link>
                </div>
            </section>

            {/* How Installation Works */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How to Install & Use</h2>
                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">1. Find the Component</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Browse the available UI components or search by category to find exactly what you need.
                            </p>
                        </div>
                        <div className="flex-1 bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">2. Copy or Install</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Copy the code snippet directly into your app, or install it via a provided package or snippet.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">3. Customize It</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Adjust styling, behavior, and structure to match your project’s design and logic.
                            </p>
                        </div>
                        <div className="flex-1 bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">4. Launch Your Feature</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Ship your updated UI with ease and confidence, using community-vetted components.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Share Your Own Section */}
            <section className="text-center py-12 bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Want to Share Your Own Component?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                    We welcome contributions! If you’ve built a useful UI component, consider sharing it with the community.
                    It helps others, builds your dev portfolio, and encourages collaboration.
                </p>
                <Link
                    to="/components/create"
                    className="inline-block px-6 py-3 bg-primary-600 dark:bg-accent-600 text-white rounded-md hover:bg-primary-700 dark:hover:bg-accent-700 transition-colors font-medium"
                >
                    Submit a Component
                </Link>
            </section>
        </motion.div>
    );
};

export default InstallationPage;
