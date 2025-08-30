import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ComponentsSideBar = () => {
    const [expandedCategories, setExpandedCategories] = useState(new Set(['Getting Started', 'Layout', 'Navigation']));

    const categories = {
        'Getting Started': ['Introduction', 'Installation', 'Theming'],
        'Layout': ['Grid', 'Container', 'Spacing', 'Divider', 'Layout', 'Footer', 'Header', 'Hero'],
        'Navigation': ['Navbar', 'Sidebar', 'Tabs', 'Tab', 'Breadcrumb', 'Pagination', 'Navigation', 'Dropdown'],
        'Forms': ['Input', 'Button', 'Checkbox', 'Radio', 'Select', 'Switch', 'Form', 'Date Picker'],
        'Data Display': ['Table', 'Card', 'Accordion', 'Tooltip', 'Modal', 'Alert', 'Badge', 'Avatar', 'Tag', 'Timeline', 'Carousel', 'Typography'],
        'Feedback': ['Toast', 'Progress', 'Spinner', 'Skeleton'],
        'Overlay': ['Modal', 'Drawer', 'Popover', 'Tooltip'],
        'Utilities': ['Icons', 'Transitions', 'Animations']
    };


    const toggleCategory = (category) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    };

    const isCategoryExpanded = (category) => expandedCategories.has(category);

    return (
        <div className="w-64 min-h-screen bg-white dark:bg-secondary-800 border-r border-gray-200 dark:border-secondary-700 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-secondary-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Components
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto py-2 px-1">
                {Object.entries(categories).map(([category, items]) => (
                    <div key={category} className="mb-1">
                        <button
                            onClick={() => toggleCategory(category)}
                            className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                                ${isCategoryExpanded(category)
                                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            <span>{category}</span>
                            <motion.span
                                animate={{
                                    rotate: isCategoryExpanded(category) ? 0 : -90,
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <FiChevronRight className="h-4 w-4" />
                            </motion.span>
                        </button>

                        <AnimatePresence>
                            {isCategoryExpanded(category) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                                    animate={{
                                        opacity: 1,
                                        height: 'auto',
                                        transition: {
                                            opacity: { duration: 0.2 },
                                            height: { duration: 0.2 }
                                        }
                                    }}
                                    exit={{
                                        opacity: 0,
                                        height: 0,
                                        transition: {
                                            opacity: { duration: 0.1 },
                                            height: { duration: 0.2 }
                                        }
                                    }}
                                    className="pl-6"
                                >
                                    <div className="space-y-1 py-1">
                                        {items.map((item, index) => (
                                            <NavLink
                                                key={index}
                                                to={`/components/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                                className={({ isActive }) => `
                                                    block px-3 py-2 text-sm rounded-md transition-colors duration-200
                                                    ${isActive
                                                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-medium'
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`
                                                }
                                            >
                                                {item}
                                            </NavLink>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-secondary-700">
                <a
                    href="https://github.com/Premkolte/AnimateHub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.027 2.747-1.027.546 1.377.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    Star on GitHub
                </a>
            </div>
        </div>
    );
};

export default ComponentsSideBar;