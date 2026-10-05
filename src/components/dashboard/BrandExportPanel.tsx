import { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import { BiLoaderAlt } from "react-icons/bi";
import { RiDownloadLine, RiPaletteLine } from "react-icons/ri";
import type { QRItem } from "../../data/mockData";
import { notify } from "../../utils/notify";

interface BrandExportPanelProps {
  qrCode: QRItem;
}

export default function BrandExportPanel({ qrCode }: BrandExportPanelProps) {
  const exportRef = useRef<HTMLDivElement>(null);
  const [brandName, setBrandName] = useState(qrCode.name);
  const [brandDescription, setBrandDescription] = useState("Scan to discover more");
  const [brandColor, setBrandColor] = useState("#153d2a");
  const [isExporting, setIsExporting] = useState(false);

  const exportBrandedQR = async () => {
    if (!exportRef.current) return;
    if (!qrCode.shortUrl) {
      notify("Backend short URL is not available for this QR code.", "error");
      return;
    }

    try {
      setIsExporting(true);
      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        pixelRatio: 3,
      });
      const link = document.createElement("a");
      link.download = `${brandName || qrCode.name}-branded-qr.png`;
      link.href = dataUrl;
      link.click();
      notify("Branded QR exported", "success");
    } catch (error) {
      console.error("Branded QR export failed:", error);
      notify("Export failed. Try again.", "error");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section className="brand-studio-panel details-brand-card">
      <div className="brand-studio-heading">
        <RiPaletteLine />
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold">
          Brand studio
        </p>
      </div>
      <p className="brand-studio-copy">
        Give this code a recognizable signature before you export it.
      </p>

      <div className="brand-studio-grid">
        <div ref={exportRef} className="brand-export-card" style={{ backgroundColor: brandColor }}>
          <div className="brand-export-card-top" style={{ color: brandColor }}>
            <span>QRFlow identity</span>
            <span>Live</span>
          </div>
          <p className="brand-export-name">{brandName || qrCode.name}</p>
          <div className="brand-export-qr">
            {qrCode.shortUrl ? (
              <QRCode
                value={qrCode.shortUrl}
                size={164}
                fgColor="#111512"
                bgColor="#ffffff"
              />
            ) : (
              <span className="brand-export-unavailable">
                Backend URL unavailable
              </span>
            )}
          </div>
          <p className="brand-export-description">
            “{brandDescription || "Scan to discover more"}”
          </p>
          <div className="brand-export-meta">
            <span className="brand-export-qrid">QR ID · {qrCode.qrId || "QR-UNASSIGNED"}</span>
            <strong>QRFlow</strong>
          </div>
        </div>
        <div className="brand-studio-controls">
          <label>
            <span>Brand name</span>
            <input
              value={brandName}
              onChange={(event) => setBrandName(event.target.value)}
              maxLength={42}
              className="brand-studio-input"
            />
          </label>
          <label className="brand-color-row">
            <span>Accent color</span>
            <input
              type="color"
              value={brandColor}
              onChange={(event) => setBrandColor(event.target.value)}
              className="brand-color-input"
              aria-label="Accent color"
            />
          </label>
          <label>
            <span>Description</span>
            <input
              value={brandDescription}
              onChange={(event) => setBrandDescription(event.target.value)}
              maxLength={58}
              className="brand-studio-input"
              placeholder="Scan to discover more"
            />
          </label>
          <button
            onClick={exportBrandedQR}
            disabled={isExporting}
            className="brand-export-button"
          >
            {isExporting ? (
              <BiLoaderAlt className="animate-spin" />
            ) : (
              <RiDownloadLine />
            )}
            {isExporting ? "Preparing..." : "Export PNG"}
          </button>
        </div>
      </div>
    </section>
  );
}
