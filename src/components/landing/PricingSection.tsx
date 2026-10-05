import { Link } from "react-router-dom";
import { BiCheck, BiArrowToRight } from "react-icons/bi";

const starterFeatures = ["5 dynamic QR codes", "Basic scan analytics", "Limited destination edits"];
const studioFeatures = ["Unlimited* dynamic QR codes", "Advanced audience analytics", "Custom branding & exports", "Priority support"];

const plans = [
  { name: "Starter", label: "For trying the flow", price: "$0", cadence: "/ forever", description: "For launching your first ideas.", features: starterFeatures, action: "Get started", featured: false },
  { name: "Studio", label: "Monthly billing", price: "$19", cadence: "/ month", description: "For teams turning every touchpoint into momentum.", features: studioFeatures, action: "Choose Studio", featured: true },
  { name: "Studio", label: "Yearly billing", price: "$15", cadence: "/ month", description: "Same Studio power, with a smarter annual rate.", features: studioFeatures, action: "Choose Studio", featured: false, yearly: true },
];

type PricingSectionProps = {
  isLoggedIn: boolean;
};

export default function PricingSection({ isLoggedIn }: PricingSectionProps) {
  return (
    <section className="section pricing-section" id="pricing">
      <div className="pricing-heading reveal-up"><div><p className="eyebrow">Pricing that stays simple</p><h2>Start small.<br /><em>Scale with signal.</em></h2></div><p className="section-copy">Choose the way you want to move. Both Studio options include the same full toolkit.</p></div>
      <div className="pricing-divider" />
      <div className="pricing-grid">
        {plans.map((plan) => {
          return <article className={`price-card ${plan.featured ? "price-card-featured" : ""} ${plan.yearly ? "price-card-yearly" : ""}`} key={`${plan.name}-${plan.label}`}>
          {plan.featured && <span className="popular-tag">Most popular</span>}{plan.yearly && <span className="popular-tag yearly-tag">Save 21%</span>}
          <p className="plan-name">{plan.name}</p><p className="plan-billing">{plan.label}</p><div className="price"><strong>{plan.price}</strong><span>{plan.cadence}</span></div>{plan.yearly && <p className="billing-note">$180 billed annually · save $48</p>}<p className="plan-description">{plan.description}</p>
          <ul>{plan.features.map((feature) => <li key={feature}><BiCheck />{feature}</li>)}</ul>
          <Link to={isLoggedIn ? "/payment" : "/signup"} className={`button ${plan.featured ? "button-light" : "button-outline"}`}>{plan.action}<BiArrowToRight /></Link>
        </article>;
        })}
      </div>
    </section>
  );
}
