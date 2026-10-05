import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiLoaderAlt, BiLockAlt, BiQrScan } from "react-icons/bi";
import { RiArrowRightLine, RiPaletteLine } from "react-icons/ri";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import BrandExportPanel from "../../components/dashboard/BrandExportPanel";
import DemoBrandCard from "../../components/dashboard/DemoBrandCard";
import { useAuth } from "../../context/AuthContext";
import { qrApi } from "../../api/qrApi";
import type { QRItem } from "../../data/mockData";
import { notify } from "../../utils/notify";

export default function BrandStudioPage() {
  const { qrId } = useParams();
  const navigate = useNavigate();
  const { user, authFetch } = useAuth();
  const [qrCodes, setQrCodes] = useState<QRItem[]>([]);
  const [selectedQrId, setSelectedQrId] = useState(qrId || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQrCodes = async () => {
      try {
        const data = await qrApi.getAll(authFetch);
        setQrCodes(data);
        setSelectedQrId((current) => current || data[0]?.qrId || "");
      } catch (error: unknown) {
        notify(error instanceof Error ? error.message : "Failed to load QR codes", "error");
      } finally {
        setLoading(false);
      }
    };

    loadQrCodes();
  }, [authFetch]);

  const selectedQr = qrCodes.find((qr) => qr.qrId === selectedQrId) || null;
  const isPro = user?.plan === "pro";

  return (
    <div className="app-page-shell">
      <Sidebar />
      <div className="app-page-main">
        <Header title="Brand Studio" subtitle="Create a recognizable signature for every QR code" />
        <main className="brand-page-content">
          <div className="brand-page-intro">
            <div>
              <p className="details-kicker">Make it yours</p>
              <h1>Turn every code into <em>brand memory.</em></h1>
              <p>Customize the identity, background, and message around your QR code before exporting a polished PNG.</p>
            </div>
            <div className="brand-page-lockup"><RiPaletteLine /><span>Studio tools</span></div>
          </div>
          <DemoBrandCard />

          {!isPro ? (
            <section className="brand-upgrade-card">
              <span className="brand-upgrade-icon"><BiLockAlt /></span>
              <p className="details-kicker">Pro workspace</p>
              <h2>Brand Studio is ready when your brand is.</h2>
              <p>Upgrade to Studio or Pro to unlock custom backgrounds, brand descriptions, and export-ready QR identity cards.</p>
              <button className="brand-upgrade-button" onClick={() => navigate("/#pricing")}>Explore Studio plans <RiArrowRightLine /></button>
            </section>
          ) : loading ? (
            <div className="brand-page-loading"><BiLoaderAlt className="animate-spin" /><span>Loading your QR codes...</span></div>
          ) : qrCodes.length === 0 ? (
            <section className="brand-empty-card"><BiQrScan /><h2>Create a QR code first</h2><p>Your Brand Studio needs a backend-generated QR URL to create an export.</p><button className="brand-upgrade-button" onClick={() => navigate("/create-qr")}>Create QR code <RiArrowRightLine /></button></section>
          ) : (
            <>
              <div className="brand-selector-row"><label htmlFor="brand-qr-select">Choose a QR code</label><select id="brand-qr-select" value={selectedQrId} onChange={(event) => setSelectedQrId(event.target.value)}>{qrCodes.map((qr) => <option value={qr.qrId} key={qr.qrId}>{qr.name}</option>)}</select></div>
              {selectedQr && <BrandExportPanel qrCode={selectedQr} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
