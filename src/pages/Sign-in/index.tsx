import { LOGO } from "@/app/constraints";
import { setToken } from "@/app/components/utils/TokenHandler";
import { Lock, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "@/components/Toastify";
import { BACKEND_BASE_URL } from "@/app/apiCallConstraints";
import Input, { PasswordInput } from "@/components/Input";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "jaurab12",
    password: "User@1234",
  });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_BASE_URL}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setToken("token", data.data.token);
        setToken("username", data.data.username);
        setToken("roles", JSON.stringify(data.data.roles));
        Toast(data?.message || "Login successful", "success"); 
        navigate("/admin");
      } else {
        Toast(data?.message || "Login failed", "error");
      }
    } catch (error: any) {
      Toast(
        error?.message || "Something went wrong. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center p-6">
      <div className=" max-w-5xl w-full flex rounded-2xl overflow-hidden shadow-2xl">
        {/* Left Panel */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-green-300 to-emerald-800 text-white p-12 flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
            <p className="opacity-90">
              Sign in to access your dashboard and manage your account
            </p>
          </div>
          <div className="mt-8">
            <div className="flex items-center mb-4">
              <div className="bg-white bg-opacity-30 p-2 rounded-full mr-3">
                <i className="fas fa-shield-alt"></i>
              </div>
              <p>Enterprise-grade security</p>
            </div>
            <div className="flex items-center mb-4">
              <div className="bg-white bg-opacity-30 p-2 rounded-full mr-3">
                <i className="fas fa-bolt"></i>
              </div>
              <p>Fast and reliable authentication</p>
            </div>
            <div className="flex items-center">
              <div className="bg-white bg-opacity-30 p-2 rounded-full mr-3">
                <i className="fas fa-chart-line"></i>
              </div>
              <p>Access powerful analytics tools</p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-2">
            <div className="flex justify-center ">
              <img src={LOGO} alt="Logo" className="object-contain h-20" />
            </div>
            <div className="text-[0.8rem] text-slate-500 font-bold">
              (Library + Innovation, futuristic)
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[1rem]">
            <div>
              <Input
                leftSection={<User size={16} />}
                label="Username"
                name="username"
                value={formData.username}
                handleChange={handleChange}
                placeholder="Enter your username"
                required
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <PasswordInput
                leftSection={<Lock size={16} />}
                label="Password"
                name="password"
                value={formData.password}
                handleChange={handleChange}
                placeholder="Enter your password"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="mb-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-900 text-white font-medium py-3 px-4 rounded-lg"
              >
                {isLoading ? <span>Signing in...</span> : <span>Sign In</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}