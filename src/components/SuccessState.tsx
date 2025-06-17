import React from "react";
import { CheckCircle2 } from "lucide-react";
// import { Overlay } from "@radix-ui/react-dialog";
import ReactDOM from "react-dom";

interface SuccessStateProps {
  title?: string;
  description?: string;
  onAction?: () => void;
  actionLabel?: string;
  onClose?: Function;
}

const SuccessState: React.FC<SuccessStateProps> = ({
  title = "Success!",
  description = "Your property has been submitted successfully.",
  onAction,
  actionLabel = "Add Another",
  onClose,
}) => {
  const overlay: any = document.getElementById("overlay");

  return ReactDOM.createPortal(
    <div
      onClick={(e: any) => {
        // e.preventDefault();
        console.log("wwwwwwwww");
        onClose?.();
      }}
      className="!w-[100%] absolute flex bg-black/60 backdrop-blur-sm justify-center items-center !h-[100%] z-100"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute z-10 flex  flex-col items-center justify-center p-6 rounded-xl bg-green-50 text-green-800 text-center shadow-md"
      >
        <CheckCircle2 size={48} className="text-primary-green mb-4" />
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        {onAction && (
          <button
            onClick={onAction}
            className="mt-4 px-4 py-2 rounded-lg bg-primary-green text-white hover:bg-primary-green-200 transition"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>,
    overlay
  );
};

export default SuccessState;
