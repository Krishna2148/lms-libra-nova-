import { forwardRef, type InputHTMLAttributes } from "react";

interface InputUseFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null | any;
  required?: boolean;
  name?: string;
  disabled?: boolean;
}

const InputUseForm = forwardRef<HTMLInputElement, InputUseFormProps>(
  ({ label, name, error, required, disabled, ...props }, ref) => (
    <div className="flex flex-col gap-1 mt-[1px]">
      <label className={`text-[0.85rem] text-gray-700`}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        ref={ref}
        name={name}
        disabled={disabled}
        className={`border px-[8px] py-[0.6rem] text-[0.85rem] rounded placeholder:text-[0.85rem] outline-none 
          ${error ? "border-red-500" : "border-gray-300"} 
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-70" : ""}
          focus:border-blue-300`}
        onFocus={(e) => !disabled && e.target.showPicker && e.target.showPicker()}
        {...props}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  )
);

InputUseForm.displayName = "InputUseForm";

export default InputUseForm;