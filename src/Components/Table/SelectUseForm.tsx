import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface SelectProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  options: any;
  error?: any;
  className?: string;
  required?: boolean;
  defaultValue?: string;
  value?: string,
  onChange?: (e: any) => void,
  disabled?: boolean
}

export default function SelectUseForm<T extends FieldValues>({
  label,
  name,
  register,
  options,
  error,
  className,
  required = false,
  defaultValue = "",
  value,
  disabled,
}: SelectProps<T>) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-[0.85rem] mt-[0.1rem]  text-gray-800">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="relative">
      <select
        id={name}
        value={value}
        defaultValue={defaultValue}
        {...register(name, { required: required ? `${label} is required` : false })}
        className={`
            w-full px-3 py-[10px] pr-10 border rounded-md text-[0.85rem] mt-[2.5px]
            appearance-none bg-white
            ${error ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500" : "outline-none border-gray-300  focus:border-blue-300"} "}
            ${disabled ? "bg-gray-100 cursor-not-allowed opacity-70" : ""}
            transition-all duration-200 ease-in-out
            ${className}
          `}
          style={{
            backgroundImage: "none",
          }}
      >
        <option value=""className="text-red-400 text-[0.85rem]" >Select {label}</option>
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
       <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <span className="text-[0.75rem] text-red-500">{typeof error === "string" ? error : error.message}</span>}
    </div>
  );
}
