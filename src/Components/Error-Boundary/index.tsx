import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';


export default function ErrorBoundary() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
            {/* Animated Card */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2.5 }}
                className="bg-white shadow-xl rounded-2xl max-w-lg w-full p-8 flex flex-col items-center text-center"
            >

                <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                    404 - Page Not Found
                </h1>
                <p className="text-gray-600 mb-6">
                    The page you are looking for might have been removed, had its name
                    changed, or is temporarily unavailable.
                </p>

                <button
                    onClick={() => navigate("/admin/dashboard")}
                    className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg"
                >
                    Go to Homepage
                </button>
            </motion.div>
        </div>
    );
}
