import QRCode from "react-qr-code";

export default function DemoBrandCard() {
  return (
    <div className="brand-demo-wrap">
      <p className="details-kicker">See the finish</p>
      <div className="brand-demo-card brand-export-card">
        <div className="brand-export-card-top"><span>QRFlow identity</span><span>Live</span></div>
        <p className="brand-export-name">Weekend menu</p>
        <div className="brand-export-qr"><QRCode value="https://qr.servanatech.info" size={164} fgColor="#111512" bgColor="#ffffff" /></div>
        <p className="brand-export-description">“Discover what is next.”</p>
        <div className="brand-export-meta"><span className="brand-export-qrid">QR ID · DEMO-001</span><strong>QRFlow</strong></div>
      </div>
    </div>
  );
}
