import React from "react";

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-gray-50 text-center shadow-md space-y-4">
      <svg
        width="120"
        height="120"
        viewBox="0 0 100 100"
        fill="none"
        className="animate-pulse"
      >
        <path
          d="M10 50 L50 10 L90 50"
          stroke="#10B981"
          strokeWidth="3"
          fill="transparent"
          className="infinite-draw"
        />
        <rect
          x="30"
          y="50"
          width="40"
          height="40"
          stroke="#10B981"
          strokeWidth="3"
          fill="transparent"
          className="infinite-draw delay-100"
        />
        <rect
          x="45"
          y="65"
          width="10"
          height="25"
          stroke="#10B981"
          strokeWidth="3"
          fill="transparent"
          className="infinite-draw delay-200"
        />
      </svg>
      <h2 className="text-xl font-semibold text-gray-700">
        Building your home...
      </h2>
      <p className="text-gray-400 text-sm">
        Hang tight! We're getting it ready.
      </p>

      <style jsx>{`
        .infinite-draw {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: draw 2s ease-in-out infinite;
        }
        .infinite-draw.delay-100 {
          animation-delay: 0.2s;
        }
        .infinite-draw.delay-200 {
          animation-delay: 0.4s;
        }
        @keyframes draw {
          0% {
            stroke-dashoffset: 300;
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 300;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingState;
