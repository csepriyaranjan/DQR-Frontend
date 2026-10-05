import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import { useAuth } from "../../context/AuthContext";
import { RiArrowLeftLine, RiCheckLine, RiMailSendLine, RiShieldCheckLine } from "react-icons/ri";

const ADMIN_EMAIL = "cse.priyaranjan@gmail.com";

const plans = [
  {
    id: "starter",
    name: "Starter",
    label: "For trying the flow",
    price: "$0",
    cadence: "/ forever",
    description: "For launching your first ideas.",
    features: ["5 dynamic QR codes", "Basic scan analytics", "Limited destination edits"],
  },
  {
    id: "studio-monthly",
    name: "Studio",
    label: "Monthly billing",
    price: "$19",
    cadence: "/ month",
    description: "For teams turning every touchpoint into momentum.",
    features: ["Unlimited* dynamic QR codes", "Advanced audience analytics", "Custom branding & exports", "Priority support"],
  },
  {
    id: "studio-yearly",
    name: "Studio",
    label: "Yearly billing",
    price: "$15",
    cadence: "/ month",
    billingNote: "$180 billed annually · save $48",
    description: "Same Studio power, with a smarter annual rate.",
    features: ["Unlimited* dynamic QR codes", "Advanced audience analytics", "Custom branding & exports", "Priority support"],
  },
];

export default function PaymentPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(user?.plan === "pro" ? "studio-monthly" : "studio-monthly");
  const [checkoutState, setCheckoutState] = useState<"idle" | "attempted">("idle");
  const [billingName, setBillingName] = useState("");
  const [billingEmail, setBillingEmail] = useState(user?.email || "");

  const selected = useMemo(
    () => plans.find((plan) => plan.id === selectedPlan) || plans[1],
    [selectedPlan],
  );
  const checkoutPrice = selected.id === "studio-yearly" ? "$180" : selected.price;
  const checkoutCadence = selected.id === "studio-yearly" ? " billed annually" : selected.cadence;

  const contactSubject = encodeURIComponent("QRFlow payment not received - system issue");
  const contactBody = encodeURIComponent(
    `Hello Admin,\n\nI tried to upgrade my QRFlow account to ${selected.name} (${checkoutPrice}${checkoutCadence}), but the payment was not received because of a system issue.\n\nName: ${billingName || "Not provided"}\nBilling email: ${billingEmail || user?.email || "Not provided"}\nSelected billing option: ${selected.label}\n\nPlease check the payment status and help me complete the upgrade.\n\nThank you,`,
  );
  const contactHref = `mailto:${ADMIN_EMAIL}?subject=${contactSubject}&body=${contactBody}`;

  return (
    <div className="app-page-shell">
      <Sidebar />
      <div className="app-page-main">
        <Header title="Plans & payment" subtitle="Choose a plan and review your upgrade request" />
        <main className="payment-page-content">
          <button onClick={() => navigate("/dashboard")} className="details-back">
            <RiArrowLeftLine /> Back to Dashboard
          </button>

          <div className="payment-page-intro">
            <div>
              <p className="details-kicker">Simple plans</p>
              <h1>Choose your <em>pace.</em></h1>
              <p>Start with the essentials, or choose Studio when every touchpoint needs more room.</p>
            </div>
            <div className="payment-simulator-badge"><RiShieldCheckLine /> Secure plan review</div>
          </div>

          <div className="payment-layout">
            <section className="payment-plan-list">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => { setSelectedPlan(plan.id); setCheckoutState("idle"); }}
                  className={`payment-plan-card ${selectedPlan === plan.id ? "selected" : ""}`}
                >
                  <span className="payment-plan-radio">{selectedPlan === plan.id ? <span /> : null}</span>
                  <span className="payment-plan-main">
                    <span className="payment-plan-topline"><strong>{plan.name}</strong><b>{plan.price}<small>{plan.cadence}</small></b></span>
                    <span className="payment-plan-billing">{plan.label}</span>
                    {plan.billingNote && <span className="payment-plan-billing-note">{plan.billingNote}</span>}
                    <span className="payment-plan-description">{plan.description}</span>
                    <span className="payment-plan-features">{plan.features.map((feature) => <span key={feature}><RiCheckLine />{feature}</span>)}</span>
                  </span>
                </button>
              ))}
            </section>

            <aside className="payment-checkout-card">
              <p className="details-kicker">Selected plan</p>
              <div className="payment-checkout-heading"><h2>{selected.name}</h2><strong>{checkoutPrice}<small>{checkoutCadence}</small></strong></div>
              <div className="payment-checkout-rule" />
              <div className="payment-billing-fields">
                <label>Name<input value={billingName} onChange={(event) => setBillingName(event.target.value)} placeholder="Your name" /></label>
                <label>Billing email<input type="email" value={billingEmail} onChange={(event) => setBillingEmail(event.target.value)} placeholder="you@example.com" /></label>
              </div>
              <div className="payment-checkout-row"><span>Account</span><strong>{user?.email || "Signed-in account"}</strong></div>
              <div className="payment-checkout-row"><span>Payment status</span><strong className={checkoutState === "attempted" ? "payment-status-warning" : ""}>{checkoutState === "attempted" ? "Not received" : "Ready to continue"}</strong></div>
              <button className="payment-simulate-button" onClick={() => setCheckoutState("attempted")}>
                {checkoutState === "attempted" ? "Payment issue noted" : `Continue with ${selected.name}`}
              </button>
              <p className="payment-disclaimer">*Studio capacity is managed for fair use. Contact admin if your payment is not received.</p>
            </aside>
          </div>

          <section className="payment-support-card">
            <div><p className="details-kicker">Payment support</p><h2>Payment not received?</h2><p>If you attempted payment and the system did not receive it, contact the admin with the prepared details.</p></div>
            <a className="payment-contact-button" href={contactHref}><RiMailSendLine /> Contact admin</a>
          </section>
        </main>
      </div>
    </div>
  );
}
