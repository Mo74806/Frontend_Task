import React from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  description = "We couldn’t process your request. Please try again.",
  onRetry,
  retryLabel = "Retry",
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-red-50 text-red-800 text-center shadow-md">
      <AlertTriangle size={48} className="text-red-500 mb-4" />
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
};

export default ErrorState;
