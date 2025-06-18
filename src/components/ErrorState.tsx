import React from "react";
import { XCircle } from "lucide-react";
import ReactDOM from "react-dom";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onAction?: () => void;
  actionLabel?: string;
  onClose?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  description,
  onAction,
  actionLabel,
  onClose,
}) => {
  const overlay: any = document.getElementById("overlay");

  return ReactDOM.createPortal(
    <div
      onClick={() => {
        onClose?.();
      }}
      className="!w-[100%] absolute flex bg-black/60 backdrop-blur-sm justify-center items-center !h-[100%] z-100"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute z-10 flex flex-col items-center justify-center p-6 rounded-xl bg-red-50 text-red-800 text-center shadow-md"
      >
        <XCircle size={46} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        {onAction && (
          <button
            onClick={onAction}
            className="cursor-pointer mt-4 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>,
    overlay
  );
};

export default ErrorState;
