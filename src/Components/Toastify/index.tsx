import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastOverrides.css";
import { CheckCircle, AlertTriangle, XCircle, X } from "lucide-react";

type ToastFunction = (message: string, variant: string) => void;

const Toast: ToastFunction = (message, variant) => {
    let icon;
    let title;
    let className;

    if (variant === "success") {
        title = "Success";
        icon = <CheckCircle className="text-white w-5 h-5" />;
        className = "bg-green-700 text-white";
    } else if (variant === "warning") {
        title = "Warning";
        icon = <AlertTriangle className="text-white w-5 h-5" />;
        className = "bg-yellow-700 text-white";
    } else if (variant === "error") {
        title = "Error";
        icon = <XCircle className="text-white w-5 h-5" />;
        className = "bg-red-700 text-white";
    }

    toast(<CustomToast title={title} icon={icon} message={message} className={className} />, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
    });
};

const CustomToast = ({ title, icon, message, className }: any) => {
    const handleClose = () => {
        toast.dismiss();
    };

    return (
        <div className={`relative flex items-center gap-3 ${className} rounded-lg p-3 w-[30rem] h-[3.5rem] shadow-lg`}>
            <button
                onClick={handleClose}
                className="absolute -left-3 -top-2 bg-gray-200 p-1 rounded-full hover:bg-red-500  hover:text-white    text-gray-600 hover:text-black transition-colors"
            >
                <X className="w-3 h-3" />
            </button>

            <div className="flex items-center gap-3  flex-1">
                <div>{icon}</div>
                <div className="flex-1">
                    <div className="font-semibold text-[0.8rem] leading-tight">{title}</div>
                    <div className="text-[0.7rem] opacity-90 leading-tight">{message}</div>
                </div>
            </div>
        </div>
    );
};

export default Toast;
