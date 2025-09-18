import { ListChecks } from "lucide-react"; 
import { useState } from "react";

const ListAction = ({ tooltipText = "List" }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <div
        className="p-[0.3rem] bg-blue-600/20 rounded-sm hover:bg-blue-600/30 cursor-pointer transition-all ease-in-out duration-200 flex items-center justify-center active:scale-95 group"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <ListChecks className="h-[0.9rem] w-[0.9rem] text-blue-600 group-hover:text-blue-800 active:text-blue-900" />
      </div>

      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-blue-600 text-white text-xs rounded whitespace-nowrap shadow-md">
          {tooltipText}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-blue-600"></div>
        </div>
      )}
    </div>
  );
};

export default ListAction;
