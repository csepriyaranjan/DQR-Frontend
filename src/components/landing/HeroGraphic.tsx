import QRCode from "react-qr-code";

export default function HeroGraphic() {
  return (
    <div className="hero-visual reveal-up" aria-label="Animated QRFlow sample code">
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />
      <div className="qr-card">
        <div className="qr-topline">
          <span>QRFlow identity</span>
          <span className="live-dot">Live</span>
        </div>
        <p className="hero-qr-name">Weekend menu</p>
        <div className="sample-qr-stage">
          <div className="sample-qr-glow" />
          <div className="sample-qr">
            <QRCode value="https://qrflow.example/demo" size={164} fgColor="#111512" bgColor="#ffffff" />
            <span className="sample-qr-scanline" />
          </div>
        </div>
        <p className="hero-qr-description">“Discover what is next.”</p>
        <div className="hero-qr-meta"><span>QR ID · DEMO-001</span><strong>QRFlow</strong></div>
      </div>
      <div className="visual-note note-top"><strong>+18.4%</strong> <small>weekly scans</small></div>
      <div className="visual-note note-bottom"><span className="pulse-dot" /> always changing</div>
    </div>
  );
}
