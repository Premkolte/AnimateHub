import { FiCode, FiUpload, FiUsers, FiShare2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, children }) => (
    <div className="bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-accent-900/30 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-primary-600 dark:text-accent-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{children}</p>
    </div>
);

const IntroductionPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12">
            {/* Hero Section */}
            <section className="text-center py-12 bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    Welcome to AnimateHub
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                    A community-driven platform for discovering, sharing, and reusing beautiful UI components.
                    Find the perfect component for your next project or share your own creations.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/components/grid"
                        className="px-6 py-3 bg-primary-600 dark:bg-accent-600 text-white rounded-md hover:bg-primary-700 dark:hover:bg-accent-700 transition-colors font-medium"
                    >
                        Explore Components
                    </Link>
                    <Link
                        to="#"
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                    >
                        Share Your Component
                    </Link>
                </div>
            </section>

            {/* Introduction Section */}
            <section id="introduction" className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    What is AnimateHub?
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-300">
                        AnimateHub is a vibrant community where developers can discover, share, and reuse UI components.
                        Unlike traditional component libraries, we empower you to access, customize, and contribute
                        to a growing collection of components created by developers like you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    <FeatureCard icon={FiCode} title="Open Source">
                        Every component is open for you to view, modify, and use in your projects. Full transparency, full control.
                    </FeatureCard>
                    <FeatureCard icon={FiUpload} title="Share & Discover">
                        Share your components with the community or find exactly what you need from our growing collection.
                    </FeatureCard>
                    <FeatureCard icon={FiUsers} title="Community Driven">
                        Built by developers, for developers. Contribute, improve, and learn from others in the community.
                    </FeatureCard>
                    <FeatureCard icon={FiShare2} title="Easy Integration">
                        Simple copy-paste or one-click install for your favorite components into any React project.
                    </FeatureCard>
                </div>
            </section>

            {/* How It Works */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How It Works</h2>
                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">1. Browse Components</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Explore our collection of components, filter by category, and find the perfect fit for your project.
                            </p>
                        </div>
                        <div className="flex-1 bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">2. Customize & Use</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Copy the code directly or install the component package. Customize it to match your design system.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">3. Share Your Work</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Built something amazing? Share it with the community and get feedback from fellow developers.
                            </p>
                        </div>
                        <div className="flex-1 bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">4. Collaborate</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Work together with others to improve existing components or create new ones.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center py-12 bg-gradient-to-r from-primary-50 to-indigo-50 dark:from-accent-900/20 dark:to-indigo-900/20 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Ready to get started?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                    Join our community of developers and start building amazing UIs with AnimateHub.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <a
                        href="/components/browse"
                        className="px-6 py-3 bg-primary-600 dark:bg-accent-600 text-white rounded-md hover:bg-primary-700 dark:hover:bg-accent-700 transition-colors font-medium"
                    >
                        Browse Components
                    </a>
                    <a
                        href="/auth/signup"
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                    >
                        Sign Up Free
                    </a>
                </div>
            </section>
        </motion.div>
    );
};

export default IntroductionPage;
