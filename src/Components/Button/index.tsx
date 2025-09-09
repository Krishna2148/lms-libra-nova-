import type { CSSProperties, ReactNode } from "react";

interface InputProps {
  children?: ReactNode | string;
  disabled?: boolean;
  fullWidth?: boolean;
  leftSection?: ReactNode;
  loading?: boolean;
  rightSection?: ReactNode;
  radius?: string | number;
  variant?: string;
  color?: string;
  textColor?: string;
  size?: string;
  handleClick?: any;
  className?: string;
  handleKeyDown?: any;
  fontSize?: string | number;
  fontWeight?: number | string;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  disabled,
  fullWidth,
  leftSection,
  loading,
  radius,
  rightSection,
  variant,
  color,
  textColor = "white",
  size,
  handleClick,
  className,
  handleKeyDown,
  fontSize = "12px",
  fontWeight = 400,
  style,
  type = "button",
  ...restprops
}: InputProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`text-current flex items-center justify-center gap-2 rounded-md ${
        fullWidth ? "w-full" : ""
      } ${className || ""}`}
      style={{
        height: "40px",
        fontSize,
        fontWeight,
        color: textColor,
        borderRadius: radius,
        backgroundColor: disabled ? "#7D9CB5" : color || "#0e2e50",
        opacity: disabled ? 0.8 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        padding: "0 16px",
        ...style,
      }}
      {...restprops}
    >
      {loading && (
        <span
          style={{
            width: "16px",
            height: "16px",
            border: "2px solid currentColor",
            borderTop: "2px solid transparent",
            borderRadius: "50%",
            display: "inline-block",
            animation: "spin 1s linear infinite",
          }}
        />
      )}
      {leftSection && <span>{leftSection}</span>}
      {children}
      {rightSection && <span>{rightSection}</span>}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </button>
  );
}
