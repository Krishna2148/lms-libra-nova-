import { Trash } from "lucide-react";
import { useState } from "react";

const DeleteAction = ({ tooltipText = "Delete" }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="relative">
      <div 
        className="p-[0.3rem] group bg-red-600/20 rounded-sm hover:bg-red-600/30 cursor-pointer transition-all ease-in-out duration-200 flex items-center justify-center active:scale-95"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Trash className="h-[0.9rem] w-[0.9rem] text-red-600 group-hover:text-red-800 active:text-red-900" />
      </div>
      
      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-slate-600 text-white text-xs rounded whitespace-nowrap shadow-md">
          {tooltipText}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-600"></div>
        </div>
      )}
    </div>
  );
};

export default DeleteAction;