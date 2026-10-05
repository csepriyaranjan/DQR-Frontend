import { BiArrowToRight, BiQrScan } from "react-icons/bi";

export default function HeroGraphic() {
  return <div className="hero-visual reveal-up" aria-label="QRFlow analytics preview"><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="qr-card"><div className="qr-topline"><span>QRF / 001</span><span className="live-dot">Live</span></div><div className="fake-qr"><BiQrScan /></div><div className="qr-bottomline"><span>summer-menu</span><BiArrowToRight /></div></div><div className="visual-note note-top">+18.4% <small>weekly scans</small></div><div className="visual-note note-bottom"><span className="pulse-dot" /> always changing</div></div>;
}
