import { BiArrowToRight, BiMap, BiMobileAlt } from "react-icons/bi";

export default function AnalyticsPreview() {
  return (
    <section className="section analytics-section" id="how-it-works">
      <div className="analytics-copy reveal-up">
        <p className="eyebrow">A clearer signal</p>
        <h2>Know what happens<br /><em>after the scan.</em></h2>
        <p className="section-copy">QRFlow turns a tiny square into a living touchpoint. Watch your audience arrive, then use the signal to make the next move smarter.</p>
        <div className="mini-stats">
          <div><strong>24.8k</strong><span>total scans</span></div>
          <div><strong>+18.4%</strong><span>this month</span></div>
        </div>
        <a className="text-link" href="#pricing">Explore the platform <BiArrowToRight /></a>
      </div>
      <div className="analytics-window reveal-up">
        <div className="window-bar"><span className="window-title">Campaign overview</span><span className="live-dot">Live</span></div>
        <div className="chart-heading"><div><span>Scans</span><strong>8,492</strong></div><span className="chart-change">+24.8%</span></div>
        <div className="chart" aria-label="Scan activity trending upward"><div className="chart-line" /><div className="chart-fill" /></div>
        <div className="chart-labels"><span>01 May</span><span>08 May</span><span>15 May</span><span>22 May</span><span>29 May</span></div>
        <div className="activity-row"><span className="activity-icon"><BiMap /></span><div><strong>Top location</strong><span>New York, United States</span></div><b>42%</b></div>
        <div className="activity-row"><span className="activity-icon"><BiMobileAlt /></span><div><strong>Most scanned on</strong><span>iPhone · Mobile web</span></div><b>68%</b></div>
      </div>
    </section>
  );
}
