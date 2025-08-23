import { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import { FiRefreshCw, FiAlertCircle, FiClock } from "react-icons/fi";

const PendingCard = ({ component, index }) => (
  <div className="flex flex-col gap-y-4 bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-gray-200 dark:border-secondary-700 p-6 hover:shadow-md transition-shadow duration-200 h-full">
    <div className="flex justify-between items-start">
      <div className="flex items-center space-x-2">
        <FiClock className="w-5 h-5 text-amber-500" />
        <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
          Pending Approval
        </span>
      </div>
      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
        {component.category || 'General'}
      </span>
    </div>
    
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{component.name}</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-1">
        {component.description || 'No description available'}
      </p>
    </div>

    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        Submitted {new Date(component.createdAt).toLocaleDateString()}
      </span>
    </div>
  </div>
);

export default function PendingComponents() {
  const [pendingComponents, setPendingComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingComponents = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      setError(null);
      const { data } = await axiosInstance.get("/profile/pending-components");
      if (data.success) {
        setPendingComponents(data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch pending components:', err);
      setError(err.response?.data?.message || 'Failed to load pending components. Please try again.');
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingComponents();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <FiRefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading pending components...</p>
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
          onClick={() => fetchPendingComponents()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pending Components</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {pendingComponents.length} {pendingComponents.length === 1 ? 'component' : 'components'} waiting for review
          </p>
        </div>
        <button
          onClick={() => fetchPendingComponents(true)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-secondary-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
        >
          <FiRefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {pendingComponents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingComponents.map((component, index) => (
            <PendingCard 
              key={component.id || index} 
              component={component} 
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <FiClock className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Pending Components</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            There are no pending components at the moment. Check back later for new submissions.
          </p>
        </div>
      )}
    </div>
  );
}