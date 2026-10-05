import { Link } from "react-router-dom";
import { BiCheck, BiArrowToRight } from "react-icons/bi";

const plans = [
  { name: "Starter", price: "$0", description: "For trying the flow and launching your first ideas.", features: ["5 dynamic QR codes", "Basic scan analytics", "Unlimited destination edits"], action: "Get started", featured: false },
  { name: "Studio", price: "$19", description: "For teams turning every touchpoint into momentum.", features: ["Unlimited dynamic QR codes", "Advanced audience analytics", "Custom branding & exports", "Priority support"], action: "Choose Studio", featured: true },
];

export default function PricingSection() {
  return (
    <section className="section pricing-section" id="pricing">
      <div className="section-intro reveal-up"><p className="eyebrow">Pricing that stays simple</p><h2>Start small.<br /><em>Scale with signal.</em></h2></div>
      <div className="pricing-grid">
        {plans.map((plan) => <article className={`price-card ${plan.featured ? "price-card-featured" : ""}`} key={plan.name}>
          {plan.featured && <span className="popular-tag">Most popular</span>}
          <p className="plan-name">{plan.name}</p><div className="price"><strong>{plan.price}</strong><span>{plan.price === "$0" ? "/ forever" : "/ month"}</span></div><p className="plan-description">{plan.description}</p>
          <ul>{plan.features.map((feature) => <li key={feature}><BiCheck />{feature}</li>)}</ul>
          <Link to="/signup" className={`button ${plan.featured ? "button-light" : "button-outline"}`}>{plan.action}<BiArrowToRight /></Link>
        </article>)}
      </div>
    </section>
  );
}
