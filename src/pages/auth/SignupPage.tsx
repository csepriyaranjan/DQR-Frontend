import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { notify } from "../../utils/notify"; 
import { BiLoaderAlt } from "react-icons/bi"; 

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (password.length < 6) {
      notify("Password must be at least 6 characters", "error");
      return;
    }

    setLoading(true);

    try {
      await signup(email, password);
      notify("Account created! Please log in.", "success");
      navigate("/login");
    } catch (err: any) {
      notify(err.message || "Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-600 mt-2">Join us today to get started.</p>
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
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Password
              </label>
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
              <p className="mt-2 text-[10px] text-gray-400 uppercase tracking-wider">
                Minimum 6 characters required
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-bold text-white transition-all bg-black hover:bg-gray-800 disabled:bg-gray-700 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <BiLoaderAlt className="animate-spin text-xl" />
                  <span>Creating Account...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-bold hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
