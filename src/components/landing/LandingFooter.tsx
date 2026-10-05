import { Link } from "react-router-dom";
import { BiArrowToRight, BiQrScan } from "react-icons/bi";

export default function LandingFooter() {
  return <footer className="landing-footer"><div className="footer-top"><div><Link to="/" className="brand-mark"><span className="brand-icon"><BiQrScan /></span><span>QRFlow</span></Link><p>Make the physical world<br />clickable.</p></div><div className="footer-links"><div><span>Explore</span><a href="#features">Product</a><a href="#pricing">Pricing</a><Link to="/signup">Get started <BiArrowToRight /></Link></div><div><span>Company</span><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><a href="mailto:hello@qrflow.example">Contact</a></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} QRFlow Systems</span><span>Made for the moments between offline and online.</span></div></footer>;
}
