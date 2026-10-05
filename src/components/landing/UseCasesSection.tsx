import { BiBarChartAlt2, BiMobileAlt, BiQrScan } from "react-icons/bi";

const useCases = [
  { icon: BiQrScan, label: "For brands", title: "Turn packaging into a next step.", text: "Connect a product, poster, or package to the story you want people to discover next." },
  { icon: BiMobileAlt, label: "For experiences", title: "Make every moment easier.", text: "Share menus, schedules, tickets, and updates without adding another app to anyone's day." },
  { icon: BiBarChartAlt2, label: "For teams", title: "Make the next decision clearer.", text: "Bring campaign links and audience signals into one calm, collaborative workspace." },
];

export default function UseCasesSection() {
  return (
    <section className="section use-cases-section">
      <div className="section-intro reveal-up">
        <p className="eyebrow">Made for the in-between</p>
        <h2>One small scan.<br /><em>Many useful moments.</em></h2>
        <p className="section-copy">QRFlow adapts to the way people already move through the world, giving every offline touchpoint a thoughtful digital follow-through.</p>
      </div>
      <div className="use-case-grid">
        {useCases.map(({ icon: Icon, label, title, text }) => (
          <article className="use-case-card reveal-up" key={label}>
            <span className="feature-icon"><Icon /></span>
            <p className="use-case-label">{label}</p>
            <h3>{title}</h3>
            <p>{text}</p>
            <span className="use-case-line" />
          </article>
        ))}
      </div>
    </section>
  );
}
