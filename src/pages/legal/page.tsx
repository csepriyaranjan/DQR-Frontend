import { Link, useLocation } from "react-router-dom";
import { BiArrowToLeft, BiQrScan } from "react-icons/bi";
import LandingFooter from "../../components/landing/LandingFooter";

const copy = {
  "/privacy": { label: "Privacy policy", title: "Your data, handled with care.", intro: "We built QRFlow to make physical-to-digital campaigns clearer, not noisier. This policy explains what we collect and why.", sections: [["What we collect", "We collect account details, QR code destinations, and aggregated scan activity needed to provide the service. We do not sell personal information."], ["How we use it", "Your information helps us operate your workspace, show analytics, improve reliability, and respond to support requests."], ["Your choices", "You can export or delete your workspace data by contacting us. We will respond within a reasonable period and verify account ownership first."]] },
  "/terms": { label: "Terms of service", title: "The ground rules are simple.", intro: "These terms keep QRFlow useful and fair for everyone building campaigns with it.", sections: [["Using QRFlow", "You are responsible for the links and content attached to your codes. Use the service lawfully and keep your account credentials secure."], ["Your content", "You retain ownership of your campaigns and destinations. You give QRFlow permission to process them only as needed to operate the product."], ["Service changes", "We may improve, update, or retire parts of the service. We will make reasonable efforts to communicate material changes in advance."]] }
};

export default function LegalPage() {
  const page = copy[useLocation().pathname as keyof typeof copy] ?? copy["/privacy"];
  return <div className="legal-page"><header className="legal-nav"><Link to="/" className="brand-mark"><span className="brand-icon"><BiQrScan /></span><span>QRFlow</span></Link><Link to="/" className="back-link"><BiArrowToLeft /> Back home</Link></header><main className="legal-content"><p className="eyebrow">{page.label}</p><h1>{page.title}</h1><p className="legal-intro">{page.intro}</p>{page.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}<p className="legal-updated">Last updated October 2026</p></main><LandingFooter /></div>;
}
