import { BiBarChartAlt2, BiEditAlt, BiLockAlt, BiPalette } from "react-icons/bi";

const features = [
  { icon: BiEditAlt, title: "Change it anytime", text: "Update the destination after the code is printed. Your campaign never has to stand still." },
  { icon: BiBarChartAlt2, title: "See what moves", text: "Turn every scan into a clear signal with location, device, and time-based analytics." },
  { icon: BiPalette, title: "Make it yours", text: "Create polished codes that match your brand, from quiet monochrome to bold campaign colors." },
  { icon: BiLockAlt, title: "Built for trust", text: "Keep your links, campaigns, and audience data organized in one private workspace." },
];

export default function FeatureGrid() {
  return (
    <section className="section features-section" id="features">
      <div className="section-intro reveal-up">
        <p className="eyebrow">The QR command center</p>
        <h2>Simple on the surface.<br /><em>Powerful underneath.</em></h2>
        <p className="section-copy">Everything you need to publish, learn, and improve your next physical-to-digital moment.</p>
      </div>
      <div className="feature-grid">
        {features.map(({ icon: Icon, title, text }, index) => (
          <article className="feature-card reveal-up" style={{ animationDelay: `${index * 90}ms` }} key={title}>
            <span className="feature-icon"><Icon /></span>
            <span className="feature-number">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
