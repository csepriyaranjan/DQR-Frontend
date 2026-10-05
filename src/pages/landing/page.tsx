import { useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowToRight } from "react-icons/bi";
import LandingNav from "../../components/landing/LandingNav";
import HeroGraphic from "../../components/landing/HeroGraphic";
import FeatureGrid from "../../components/landing/FeatureGrid";
import AnalyticsPreview from "../../components/landing/AnalyticsPreview";
import UseCasesSection from "../../components/landing/UseCasesSection";
import PricingSection from "../../components/landing/PricingSection";
import LandingFooter from "../../components/landing/LandingFooter";
import "./Landing.css";

export default function LandingPage() {
  const [isLoggedIn] = useState(() => Boolean(localStorage.getItem("token")));

  return (
    <div className="landing-shell">
      <LandingNav isLoggedIn={isLoggedIn} />
      <main>
        <header className="hero">
          <div className="hero-copy-block reveal-up">
            <p className="eyebrow">Dynamic QR infrastructure</p>
            <h1>Make the physical world <em>clickable.</em></h1>
            <p className="hero-copy">Create QR codes that keep working long after they are printed. Update destinations, understand your audience, and make every scan count.</p>
            <div className="hero-actions"><Link to={isLoggedIn ? "/dashboard" : "/signup"} className="button button-dark">{isLoggedIn ? "Go to dashboard" : "Create your first QR"}<BiArrowToRight /></Link><a href="#how-it-works" className="text-link">See how it works</a></div>
            <div className="hero-meta"><div><strong>10k+</strong><span>active campaigns</span></div><div><strong>99.9%</strong><span>platform uptime</span></div><div><strong>∞</strong><span>possibilities</span></div></div>
          </div>
          <HeroGraphic />
        </header>
        <div className="logo-strip"><span>Northstar</span><span>Kinfolk</span><span>Notionary</span><span>Onda</span><span>Kindred</span></div>
        <FeatureGrid />
        <AnalyticsPreview />
        <UseCasesSection />
        <PricingSection isLoggedIn={isLoggedIn} />
        <section className="cta-section"><p className="eyebrow">Your next signal starts here</p><h2>Make something<br /><em>worth scanning.</em></h2><p>Free to start. Ready when you are.</p><Link to={isLoggedIn ? "/dashboard" : "/signup"} className="button button-dark">{isLoggedIn ? "Open your workspace" : "Start for free"}<BiArrowToRight /></Link></section>
      </main>
      <LandingFooter />
    </div>
  );
}
