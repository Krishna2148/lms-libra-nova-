import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trimStart();

    const syntheticEvent = {
      ...e,
      target: { ...e.target, value: trimmedValue },
    };
    onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
  };
  return (
    <div className="flex p-2 items-center border border-gray-300 !bg-white rounded w-[300px]">
      <Search size={16} className="text-gray-500 mr-2 ml-1" />
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder || "Search..."}
        className="flex-grow focus:outline-none text-sm placeholder:text-[0.87rem] placeholder:text-gray-700"
      />
    </div>
  );
};

export default SearchInput;
