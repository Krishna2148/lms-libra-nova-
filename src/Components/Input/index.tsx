// this is a input and password input component wher we can pass the label , placeholder , description , error , className , leftSection , rightSection , handleChange , value , disabled , color , fontSize , fontWeight , style , required , type

import { type ReactNode, type CSSProperties, useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface InputProps {
  label?: string
  placeholder?: string
  description?: string
  error?: string | null
  className?: string
  leftSection?: ReactNode
  rightSection?: ReactNode
  handleChange?: any
  value?: string
  disabled?: boolean
  color?: string
  fontSize?: string | number
  fontWeight?: string | number
  style?: CSSProperties
  required?: boolean
  type?: string
  handleBlur?: any
  onKeyDown?: any
}

export default function Input({
  label,
  placeholder,
  // description,
  error,
  className,
  leftSection,
  rightSection,
  handleChange,
  value,
  disabled,
  color = "#474747",
  fontSize = "13px",
  fontWeight = 400,
  style,
  type = "text",
  required = false,
  handleBlur,
  onKeyDown,
}: InputProps) {
  return (
    <div className={className || "flex flex-col gap-[0.25rem]"} style={{ color, fontSize, fontWeight, ...style }}>
      <label className="text-[0.85rem] font-medium text-gray-700 ">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="relative">
        {leftSection && <div className="absolute border-gray-200 border bg-gray-200 rounded-md p-1 left-2 top-1/2 transform -translate-y-1/2 z-10">{leftSection}</div>}
        <input
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          className={`
            w-full border border-gray-300 rounded-md
            placeholder:text-[0.85rem] placeholder:text-[#9ca3af]
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            transition-all duration-200
            ${leftSection ? "pl-10" : "pl-3"}
            ${rightSection ? "pr-10" : "pr-3"}
          `}
          style={{
            padding: leftSection || rightSection ? "12px 40px 12px 12px" : "12px",
            fontSize,
            fontWeight,
            color,
            paddingLeft: leftSection ? "40px" : "12px",
            paddingRight: rightSection ? "40px" : "12px",
          }}
        />
        {rightSection && <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">{rightSection}</div>}
      </div>
      {error && <span className="text-[0.75rem] text-red-500">{error}</span>}
    </div>
  )
}

export function PasswordInput({
  label,
  placeholder,
  description,
  error,
  className,
  leftSection,
  rightSection,
  handleChange,
  color = "#474747",
  fontSize = "14px",
  fontWeight = 400,
  style,
  required = false,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={className || "flex flex-col gap-[0.25rem]"} style={{ color, fontSize, fontWeight, ...style }}>
      <label className="text-[0.85rem] font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="relative">
        {leftSection && <div className="absolute border-gray-200 border bg-gray-200 rounded-md p-1 left-2 top-1/2 transform -translate-y-1/2 z-10">{leftSection}</div>}
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          onChange={handleChange}
          className={`
            w-full border border-gray-300 rounded-md
            placeholder:text-[0.85rem] placeholder:text-[#9ca3af]
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            ${leftSection ? "pl-10" : "pl-3"}
            pr-10
          `}
          style={{
            padding: "12px 40px 12px 12px",
            fontSize,
            fontWeight,
            color,
            paddingLeft: leftSection ? "40px" : "12px",
            paddingRight: "40px",
          }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 text-gray-500 hover:text-gray-700 transition-colors"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
        {rightSection && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 z-10">{rightSection}</div>
        )}
      </div>
      {description && <span className="text-[0.75rem] text-gray-600">{description}</span>}
      {error && <span className="text-[0.75rem] text-red-500">{error}</span>}
    </div>
  )
}
