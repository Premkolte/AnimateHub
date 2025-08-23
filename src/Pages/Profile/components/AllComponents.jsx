import { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import { FiRefreshCw, FiAlertCircle, FiBox } from "react-icons/fi";

const ComponentCard = ({ component, index }) => (
  <div className="flex flex-col gap-y-4 bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-gray-200 dark:border-secondary-700 p-6 hover:shadow-md transition-shadow duration-200 h-full">
    <div className="flex justify-between items-start">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Component {index + 1}</h3>
      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        {component.category || 'General'}
      </span>
    </div>
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{component.name}</h2>
    <p className="text-gray-600 dark:text-gray-400 flex-grow">
      {component.description || 'No description available'}
    </p>
    <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {new Date(component.createdAt).toLocaleDateString()}
      </span>
      <a 
        href={component.repoLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium text-sm"
      >
        View Component
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
);

export default function AllComponents() {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllComponents = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      setError(null);
      const { data } = await axiosInstance.get("/profile/approved-components");
      if (data.success) {
        setComponents(data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch components:', err);
      setError(err.response?.data?.message || 'Failed to load components. Please try again.');
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllComponents();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <FiRefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading components...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/50 mb-4">
          <FiAlertCircle className="w-8 h-8 text-red-500 dark:text-red-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Something went wrong</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
        <button
          onClick={() => fetchAllComponents()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiRefreshCw className="mr-2 -ml-1 h-4 w-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Components</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {components.length} {components.length === 1 ? 'component' : 'components'} available
          </p>
        </div>
        <button
          onClick={() => fetchAllComponents(true)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-secondary-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiRefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </button>
      </div>

      {components.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component, index) => (
            <ComponentCard key={component.id || index} component={component} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <FiBox className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No components found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            You haven't created any components yet. Get started by creating your first component!
          </p>
          <div className="mt-6">
            <button
              onClick={() => console.log('Create new component')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Component
            </button>
          </div>
        </div>
      )}
    </div>
  );
}