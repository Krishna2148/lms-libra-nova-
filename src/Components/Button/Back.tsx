import type { CSSProperties, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  children?: ReactNode;
  radius?: string | number;
  fontSize?: string | number;
  fontWeight?: string | number;
  style?: CSSProperties;
  className?: string;
}

export default function BackButton({
  children,
  radius = "8px",
  fontSize = "12px",
  fontWeight = 400,
  style,
  className,
}: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center justify-center text-current  ${className || ""}`}
      style={{
        height: "40px",
        padding: "0 16px",
        fontSize,
        fontWeight,
        borderRadius: radius,
        backgroundColor: "#d1d5db", // gray-300
        color: "black",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
