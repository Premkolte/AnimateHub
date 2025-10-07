import React from 'react';
import { motion } from 'framer-motion';
import {
    FaChartLine,
    FaChartBar,
    FaUserLock,
    FaTable,
    FaCalendarAlt,
    FaEdit,
    FaInfoCircle,
    FaImage,
    FaSearch
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ComponentsBase = () => {

    const componentCategories = [
        {
            id: 1,
            title: 'Line Chart',
            description: 'A placeholder for a responsive and interactive line graph.',
            icon: FaChartLine
        },
        {
            id: 2,
            title: 'Bar Graph',
            description: 'A placeholder for a customizable bar chart component.',
            icon: FaChartBar
        },
        {
            id: 3,
            title: 'Login/Signup Form',
            description: 'A placeholder for authentication UI including login and signup forms.',
            icon: FaUserLock
        },
        {
            id: 4,
            title: 'UI Table',
            description: 'A placeholder for a table with sorting, filtering, and pagination.',
            icon: FaTable
        },
        {
            id: 5,
            title: 'Calendar',
            description: 'A placeholder for an interactive calendar or date picker.',
            icon: FaCalendarAlt
        },
        {
            id: 6,
            title: 'Form Elements',
            description: 'A placeholder for various input fields and form controls.',
            icon: FaEdit
        },
        {
            id: 7,
            title: 'UI Feedback',
            description: 'A placeholder for modals, toasts, loaders, and tooltips.',
            icon: FaInfoCircle
        },
        {
            id: 8,
            title: 'Media Components',
            description: 'A placeholder for image galleries and video players.',
            icon: FaImage
        },
        {
            id: 9,
            title: 'Navbar & Sidebar',
            description: 'A placeholder for responsive navigation components including top navbars and sidebars.',
            icon: FaEdit,
        },
        {
            id: 10,
            title: 'Tabs & Accordions',
            description: 'A placeholder for tabbed interfaces and accordion-style collapsible content.',
            icon: FaTable,
        },
        {
            id: 11,
            title: 'Buttons & Badges',
            description: 'A placeholder for reusable buttons, tags, and badge UI elements.',
            icon: FaChartBar,
        },
        {
            id: 12,
            title: 'Search & Filters',
            description: 'A placeholder for search inputs, dropdown filters, and tag-based filters.',
            icon: FaSearch,
        }

    ];

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
                    Discover. Share. Reuse. UI Components
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                    A community-driven platform for beautiful UI components.
                    Find the perfect component for your next project or share your own creations.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/components/introduction"
                        className="px-6 py-3 bg-primary-600 dark:bg-accent-600 text-white rounded-md hover:bg-primary-700 dark:hover:bg-accent-700 transition-colors font-medium"
                    >
                        Get started
                    </Link>
                    <Link
                        to="/components/introduction"
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                    >
                        Browse Components
                    </Link>
                </div>
            </section>

            {/* Note about placeholders */}
            <div className="max-w-4xl mx-auto text-sm text-gray-600 dark:text-gray-400 text-center">
                <p>
                    <strong>Note:</strong> These are <em>placeholders</em> for actual UI components.
                    We'll integrate the real components in the next phase of development.
                </p>
            </div>

            {/* Components Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {componentCategories.map((component) => (
                    <div
                        key={component.id}
                        className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="p-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-accent-900/30 flex items-center justify-center mx-auto mb-4">
                                <component.icon className="text-primary-600 dark:text-accent-400 text-2xl md:text-3xl" />
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {component.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {component.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </motion.div>
    );
};

export default ComponentsBase;
