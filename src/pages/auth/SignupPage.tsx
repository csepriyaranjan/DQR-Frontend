import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { notify } from "../../utils/notify"; 
import { BiLoaderAlt, BiQrScan } from "react-icons/bi";

const SignupPage: React.FC = () => {
  const [name, setName] = useState<string>("");
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
      await signup(name, email, password);
      notify("Account created! Please log in.", "success");
      navigate("/login");
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <aside className="auth-aside"><Link to="/" className="auth-brand"><span className="auth-brand-icon"><BiQrScan /></span>QRFlow</Link><div className="auth-aside-content"><p className="auth-eyebrow">Start with a signal</p><h2>Build something <em>worth scanning.</em></h2><p>Create dynamic codes that stay flexible after print, with a calm workspace for every campaign and destination.</p></div><p className="auth-aside-footer">The physical world, made clickable.</p></aside>
      <main className="auth-main"><div className="auth-form-wrap"><p className="auth-kicker">Create your workspace</p><h1>Start simply.</h1><p className="auth-subtitle">Set up your account and publish your first dynamic QR code.</p><form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="name">Your name or business name</label>
              <input
                id="name"
                type="text"
                value={name}
                disabled={loading}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name or business"
                maxLength={100}
                autoComplete="name"
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
                className=""
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                className=""
                placeholder="••••••••"
                required
              />
              <p className="auth-legal">
                Minimum 6 characters required
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="auth-submit"
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
          </form><p className="auth-footnote">Already have an account? <Link to="/login">Log in</Link></p><p className="auth-legal">By continuing, you agree to our <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>.</p></div></main>
    </div>
  );
};

export default SignupPage;
