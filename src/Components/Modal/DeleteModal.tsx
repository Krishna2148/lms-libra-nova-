import { cn } from "@/app/components/lib/utils";
import { AlertTriangle, Trash2, X } from "lucide-react";
import Button from "../Button";


interface ModalProps {
  open: boolean;
  close: () => void;
  className?: string;
  isLoading?: boolean;
  handleDelete: () => void;
  message?: string;
}

export default function DeleteModal({
  className,
  open,
  close,
  handleDelete,
  isLoading,
}: ModalProps) {
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
          <div className="p-3 rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Delete Confirmation
          </h2>
        </div>

        <p className="text-base leading-normal text-gray-600">
          Are you sure you want to delete this content? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <Button
            color="#f7f7f7"
            className="!border hover:bg-gray-100 !border-red-500 !text-sm text-red-900 flex items-center gap-2"
            textColor="#000000"
            handleClick={close}
            disabled={isLoading}
          >
            <span>Cancel</span>
            <X className="h-4 w-4 ml-1" />
          </Button>
          <Button
            color="red"
            className="bg-red-600 hover:bg-red-700 text-white !text-sm flex items-center gap-2"
            handleClick={handleDelete}
            loading={isLoading}
            disabled={isLoading}
          >
            <span>Delete</span>
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Trash2 className="h-4 w-4 ml-1" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
