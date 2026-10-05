import { BiArrowToRight, BiMap, BiMobileAlt } from "react-icons/bi";

export default function AnalyticsPreview() {
  return (
    <section className="section analytics-section" id="how-it-works">
      <div className="analytics-copy reveal-up">
        <p className="eyebrow">A clearer signal</p>
        <h2>Know what happens<br /><em>after the scan.</em></h2>
        <p className="section-copy">QRFlow turns a tiny square into a living touchpoint. Watch your audience arrive, then use the signal to make the next move smarter.</p>
        <div className="signal-points">
          <span>Live campaign health</span>
          <span>Clear audience patterns</span>
        </div>
        <a className="text-link" href="#pricing">Explore the platform <BiArrowToRight /></a>
      </div>
      <div className="analytics-window reveal-up">
        <div className="window-bar"><span className="window-title">Campaign overview</span><span className="live-dot">Live</span></div>
        <div className="chart-heading"><div><span>Campaign activity</span><strong>Moving forward</strong></div><span className="chart-change">Healthy</span></div>
        <div className="chart" aria-label="Scan activity trending upward"><div className="chart-line" /><div className="chart-fill" /></div>
        <div className="chart-labels"><span>01 May</span><span>08 May</span><span>15 May</span><span>22 May</span><span>29 May</span></div>
        <div className="activity-row"><span className="activity-icon"><BiMap /></span><div><strong>Audience pattern</strong><span>People are discovering your link</span></div><b>Clear</b></div>
        <div className="activity-row"><span className="activity-icon"><BiMobileAlt /></span><div><strong>Next best move</strong><span>Keep the conversation going</span></div><b>Ready</b></div>
      </div>
    </section>
  );
}
