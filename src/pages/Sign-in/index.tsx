import { LOGO } from "@/app/constraints";
import Toast from "@/Components/Toastify";
import { setToken, getToken, removeToken } from "@/utils/tokenHandler";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load saved credentials on component mount
  useEffect(() => {
    const savedUsername = getToken("remembered_username");
    const savedPassword = getToken("remembered_password");
    const savedRememberMe = getToken("remember_me") === "true";

    if (savedRememberMe && savedUsername && savedPassword) {
      setFormData({
        username: savedUsername,
        password: savedPassword
      });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRememberMeChange = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);

    if (!isChecked) {
      // Remove saved credentials when unchecked
      removeToken("remembered_username");
      removeToken("remembered_password");
      removeToken("remember_me");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("https://qimsapi.theqpixel.com/qims/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Save credentials if "Remember me" is checked
        if (rememberMe) {
          setToken("remembered_username", formData.username);
          setToken("remembered_password", formData.password);
          setToken("remember_me", "true");
        }
        Toast("Login successful", "success");

        setToken("token", data.data.token);
        setToken("username", data.data.username);
        setToken("role", JSON.stringify(data.data.role));

        const permissionsRes = await fetch(
          `https://qimsapi.theqpixel.com/qims/permission/by-roles?roles=${data.data.role[0]}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + data.data.token,
            },
          }
        );
        const permissionsData = await permissionsRes.json();
        const permissions = permissionsData.data.map(
          (permission) => permission.name
        );

        setToken("permissions", JSON.stringify(permissions));
        navigate("admin/dashboard");
        // window.location.href = "admin/dashboard";

      } else {
        setError(data.message || "Login failed");
        Toast(data?.message, "error");
      }
    } catch (err) {
      setError("Something went wrong. Please try again." + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-100/20  flex items-center justify-center p-4">
      <div className="max-w-6xl w-full flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl">
        {/* Left Panel - Illustration */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-green-300 to-emerald-800 text-white p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
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

        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-2">
            <div className="flex justify-center ">
              <img src={LOGO} alt="Logo" className="object-contain h-20" />
            </div>
            <div className="text-[0.8rem] text-slate-500 font-bold">(Library + Innovation, futuristic)</div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-black" size={20} />
                </div>
                <input
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-black" size={18} />
                </div>
                <input
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>


            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div>
                <a
                  href="#"
                  className="text-sm text-primary hover:text-secondary font-medium"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-900 text-white font-medium py-3 px-4 rounded-lg"
              >
                {isLoading ? (
                  <span>Signing in...</span>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}