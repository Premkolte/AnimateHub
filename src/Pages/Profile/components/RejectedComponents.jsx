export default function RejectedComponents() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(12)].map((_, index) => (
                <div key={index} className="flex flex-col gap-y-4 bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-gray-200 dark:border-secondary-700 p-4">
                    <h3 className="text-lg font-medium">Component {index + 1}</h3>
                    <h2 className='text-xl font-semibold'>Component Name</h2>
                    <p className="text-gray-600 dark:text-gray-400">This is a sample component description.</p>
                    <p className="text-red-500">Reason: Component failed to meet the required criteria</p>

                    <button className='text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors'>View Component</button>

                </div>
            ))}
        </div>
    )
}