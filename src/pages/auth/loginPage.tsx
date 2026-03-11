import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { notify } from "../../utils/notify"; // Import notify
import { BiLoaderAlt } from "react-icons/bi"; // Import Loader icon

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      notify("Login successful. Welcome back!", "success");
      navigate("/dashboard");
    } catch (err: any) {
      // Use notify instead of local error state
      notify("Invalid email or password. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-2">
            Please enter your details to sign in.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-gray-500 hover:text-black transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-bold text-white transition-all bg-black hover:bg-gray-800 disabled:bg-gray-700 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <BiLoaderAlt className="animate-spin text-xl" />
                  <span>Authenticating...</span>
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-black font-bold hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
