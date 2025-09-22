import { cn } from "@/app/components/lib/utils"; 
import { CheckCircle, X } from "lucide-react";
import Button from "../Button";

interface ApproveModalProps {
  open: boolean;
  close: () => void;
  className?: string;
  isLoading?: boolean;
  handleApprove: () => void;
  message?: string;
  title?: string; 
}

export default function ApproveModal({
  className,
  open,
  close,
  handleApprove,
  isLoading,
  message,
  title = "Approve Confirmation", 
}: ApproveModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={close}
      />
      <div
        className={cn(
          "relative bg-white rounded-xl shadow-lg max-w-lg w-full p-6 z-10",
          className
        )}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            {title}
          </h2>
        </div>

        <p className="text-base leading-normal text-gray-600">
          {message ||
            "Are you sure you want to approve this content? This action will proceed immediately."}
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            color="#f7f7f7"
            className="!border hover:bg-gray-100 !border-green-500 !text-sm text-green-900 flex items-center gap-2"
            textColor="#000000"
            handleClick={close}
            disabled={isLoading}
          >
            <span>Cancel</span>
            <X className="h-4 w-4 ml-1" />
          </Button>
          <Button
            color="green"
            className="bg-green-600 hover:bg-green-700 text-white !text-sm flex items-center gap-2"
            handleClick={handleApprove}
            loading={isLoading}
            disabled={isLoading}
          >
            <span>Return</span>
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <CheckCircle className="h-4 w-4 ml-1" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
