import { Link } from "react-router-dom";
import { BiArrowToRight, BiQrScan } from "react-icons/bi";

type LandingNavProps = {
  isLoggedIn: boolean;
};

export default function LandingNav({ isLoggedIn }: LandingNavProps) {
  return (
    <nav className="landing-nav" aria-label="Main navigation">
      <Link to="/" className="brand-mark">
        <span className="brand-icon"><BiQrScan /></span>
        <span>QRFlow</span>
      </Link>
      <div className="nav-links">
        <a href="#features">Product</a>
        <a href="#how-it-works">How it works</a>
        <a href="#pricing">Pricing</a>
      </div>
      <div className="nav-actions">
        <Link to={isLoggedIn ? "/dashboard" : "/login"} className="nav-login">
          {isLoggedIn ? "Dashboard" : "Log in"}
        </Link>
        <Link to={isLoggedIn ? "/dashboard" : "/signup"} className="button button-dark button-small">
          {isLoggedIn ? "Open app" : "Start for free"}<BiArrowToRight />
        </Link>
      </div>
    </nav>
  );
}
