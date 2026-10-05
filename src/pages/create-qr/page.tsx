import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { qrApi } from "../../api/qrApi";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import { notify } from "../../utils/notify";
import { BiLoaderAlt } from "react-icons/bi";
import { RiArrowRightLine, RiQrCodeLine } from "react-icons/ri";

export default function CreateQR() {
  const { authFetch } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const qr = await qrApi.create(authFetch, { name, destinationUrl });
      notify("QR Code created successfully!", "success");
      navigate(`/details/${qr.qrId}`);
    } catch (error: unknown) {
      notify(error instanceof Error ? error.message : "Failed to create QR code. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-page-shell">
      <Sidebar />
      <div className="app-page-main">
        <Header title="Create QR Code" subtitle="Generate a new dynamic QR code" />
        <main className="create-page-content">
          <div className="create-page-layout">
            <section className="create-form-card">
              <p className="details-kicker">New signal</p>
              <h1>Create a code that can keep changing.</h1>
              <p className="create-form-intro">Give your code a clear name and the destination it should open today. You can update the destination later.</p>
              <form onSubmit={handleSubmit}>
                <label>QR name<input type="text" value={name} disabled={isSubmitting} onChange={(event) => setName(event.target.value)} placeholder="e.g. Summer campaign" required /></label>
                <label>Destination URL<input type="url" value={destinationUrl} disabled={isSubmitting} onChange={(event) => setDestinationUrl(event.target.value)} placeholder="https://your-website.com" required /></label>
                <button type="submit" disabled={isSubmitting}>{isSubmitting ? <><BiLoaderAlt className="animate-spin" /> Creating...</> : <>Create QR code <RiArrowRightLine /></>}</button>
              </form>
            </section>
            <aside className="create-next-card">
              <span className="create-next-icon"><RiQrCodeLine /></span>
              <p className="details-kicker">Next step</p>
              <h2>Customize and export after creation.</h2>
              <p>Your backend-generated QR URL will open in Details, where you can view analytics and create a branded export card.</p>
              <button type="button" onClick={() => navigate("/brand-studio")}><RiArrowRightLine /> Open Brand Studio</button>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
