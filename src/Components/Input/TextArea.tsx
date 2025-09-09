// this is a input and password input component wher we can pass the label , placeholder , error , className , handleChange , value , disabled , color , fontSize , fontWeight , style

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  error?: string | null;
  className?: string;
  value?: string;
  handleChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  required?: boolean;
  style?: React.CSSProperties; 
  defaultValue?: string;
}

export default function TextArea({
  label,
  placeholder,
  error,
  className,
  value,
  handleChange,
  disabled,
  required = false,
  style = {},
  defaultValue,
}: TextAreaProps) {
  return (
    <div className={className || "flex flex-col gap-[0.25rem]"} style={style}>
      {label && (
        <label
          className="text-[0.75rem] font-medium text-gray-700"
          style={{ fontSize: style.fontSize || "12px" }}
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <textarea
        className="border p-2 text-sm rounded-md resize-vertical focus:border-blue-300 focus:ring-0 focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        style={{
          fontSize: "14px",
          ...style,
        }}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
