"use client"

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center">
        <span className="text-red-500 text-xl mr-3">⚠️</span>
        <div className="flex-1">
          <h3 className="text-red-800 font-medium">Error</h3>
          <p className="text-red-700 text-sm mt-1">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
