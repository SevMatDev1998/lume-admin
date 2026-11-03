import clsx from "clsx";
import React from "react";

interface ButtonProps {
  /** Text to display on the button */
  text?: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: "button" | "reset" | "submit";
  /** Indicates if the button should show a loading state */
  loading?: boolean;
  disable?:boolean;
}

const LoadButton: React.FC<ButtonProps> = ({
  text,
  className = "",
  onClick,
  style = {},
  type = "button",
  loading = false,
  disable= false
}) => {
  return (
    <button
      type={type}
      onClick={!loading ? onClick : undefined}
      className={clsx(
        "h-10 w-[140px] rounded-md p-2 flex items-center justify-center transition-colors disabled:opacity-50",
        "bg-light-cornflower-blue text-black hover:bg-blizzard-blue",
        className
      )}
      style={style}
      disabled={loading || disable}
      aria-busy={loading}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        text
      )}
    </button>
  );
};

export default LoadButton;
  