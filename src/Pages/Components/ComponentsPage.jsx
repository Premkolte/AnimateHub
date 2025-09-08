import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ComponentsSideBar from "./components/ComponentsSideBar";
import ComponentsBase from './components/ComponentsBase';

const ComponentsPage = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-secondary-900">
            <div className="flex min-h-[calc(100vh-4rem)]">
                <ComponentsSideBar />

                <main className="flex-1 p-8 overflow-y-auto">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-12"
                    >
                        <Outlet />

                        {location.pathname === '/components' && (
                            <ComponentsBase />
                        )}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default ComponentsPage;