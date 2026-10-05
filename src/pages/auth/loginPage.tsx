import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { notify } from "../../utils/notify"; // Import notify
import { BiLoaderAlt, BiQrScan } from "react-icons/bi";

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
    } catch {
      notify("Invalid email or password. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <aside className="auth-aside"><Link to="/" className="auth-brand"><span className="auth-brand-icon"><BiQrScan /></span>QRFlow</Link><div className="auth-aside-content"><p className="auth-eyebrow">Welcome back to the signal</p><h2>Make every scan <em>matter.</em></h2><p>Your QR workspace keeps campaigns moving, destinations flexible, and useful audience signals in one place.</p></div><p className="auth-aside-footer">The physical world, made clickable.</p></aside>
      <main className="auth-main"><div className="auth-form-wrap"><p className="auth-kicker">Sign in</p><h1>Welcome back.</h1><p className="auth-subtitle">Enter your details to continue to your QRFlow workspace.</p><form onSubmit={handleSubmit} className="auth-form">
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
              <div className="auth-password-row"><label htmlFor="password">Password</label><button type="button" className="auth-forgot">Forgot?</button></div>
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="auth-submit"
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
          </form><p className="auth-footnote">Don't have an account? <Link to="/signup">Sign up</Link></p><p className="auth-legal">By continuing, you agree to our <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>.</p></div></main>
    </div>
  );
};

export default LoginPage;
