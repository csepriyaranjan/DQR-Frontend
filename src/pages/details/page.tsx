import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import { qrApi, type QRAnalytics } from "../../api/qrApi";
import { useAuth } from "../../context/AuthContext";
import { notify } from "../../utils/notify";
import { BiLoaderAlt } from "react-icons/bi";

import {
  RiArrowLeftLine,
  RiExternalLinkLine,
  RiTimeLine,
  RiStackLine,
  RiDownloadLine,
} from "react-icons/ri";

export default function Details() {
  const { qrId } = useParams();
  const navigate = useNavigate();
  const { authFetch } = useAuth();

  const [qrCode, setQrCode] = useState<any>(null);
  const [analytics, setAnalytics] = useState<QRAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSimpleExporting, setIsSimpleExporting] = useState(false);
  const simpleExportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchQR = async () => {
      try {
        setLoading(true);
        const [data, analyticsData] = await Promise.all([
          qrApi.getOne(authFetch, qrId!),
          qrApi.getAnalytics(authFetch, qrId!),
        ]);
        setQrCode(data);
        setAnalytics(analyticsData);
      } catch (err: any) {
        notify(err.message || "Failed to fetch QR code analytics", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchQR();
  }, [qrId, authFetch]);

  const exportSimpleQr = async () => {
    if (!simpleExportRef.current || !qrCode?.shortUrl) {
      notify("Backend short URL is not available for this QR code.", "error");
      return;
    }

    try {
      setIsSimpleExporting(true);
      const dataUrl = await toPng(simpleExportRef.current, { cacheBust: true, pixelRatio: 3 });
      const link = document.createElement("a");
      link.download = `${qrCode.name || "qr-code"}.png`;
      link.href = dataUrl;
      link.click();
      notify("QR exported", "success");
    } catch {
      notify("Export failed. Try again.", "error");
    } finally {
      setIsSimpleExporting(false);
    }
  };

  return (
    <div className="app-page-shell">
      <Sidebar />

      <div className="app-page-main">
        <Header
          title={loading ? "Loading..." : qrCode?.name}
          subtitle="Analytics & Identity"
        />

        <main className="details-main">
          <button
            onClick={() => navigate("/dashboard")}
            className="details-back"
          >
            <RiArrowLeftLine /> Back to Dashboard
          </button>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <BiLoaderAlt className="w-12 h-12 animate-spin mb-4" />
              <p className="font-mono text-xs tracking-widest uppercase text-gray-400">
                Retrieving Matrix Data...
              </p>
            </div>
          ) : (
            qrCode && (
              <>
              <div className="details-hero animate-in fade-in duration-500">
                {/* Metadata Section */}
                <div className="details-overview">
                  <section>
                    <h1 className="details-title">
                      {qrCode.name}
                    </h1>
                    <p className="details-id">
                      UUID: {qrCode.qrId}
                    </p>
                  </section>

                  <div className="details-metrics">
                    <div className="details-metric">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-bold">
                        Total Scans
                      </p>
                      <p className="text-4xl font-light italic">
                        {qrCode.totalScans}
                      </p>
                    </div>
                    <div className="details-metric">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-bold">
                        Daily Volume
                      </p>
                      <p className="text-4xl font-light italic">
                        {qrCode.todayScans}
                      </p>
                    </div>
                  </div>

                  <div className="details-meta">
                    <div className="details-meta-row">
                      <span className="details-meta-label">
                        <RiExternalLinkLine /> Target
                      </span>
                      <a
                        href={qrCode.destinationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="details-meta-value details-link"
                      >
                        {qrCode.destinationUrl}
                      </a>
                    </div>

                    <div className="details-meta-row">
                      <span className="details-meta-label">
                        <RiTimeLine /> Created
                      </span>
                      <span className="details-meta-value">
                        {new Date(qrCode.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="details-meta-row">
                      <span className="details-meta-label">
                        <RiStackLine /> Revisions
                      </span>
                      <span className="details-meta-value">
                        {qrCode.updateCount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* QR Visual Section */}
                <div className="details-qr-column">
                  <div className="details-qr-card">
                    <div className="details-qr-card-header">
                      <span>QR code</span>
                      <span className="details-qr-card-status">Ready</span>
                    </div>
                    <div ref={simpleExportRef} className="details-qr-card-code">
                      <QRCode value={qrCode.shortUrl || ""} size={260} fgColor="#111512" bgColor="#ffffff" />
                    </div>
                    <p className="details-qr-card-id">QR ID · {qrCode.qrId}</p>
                    <button className="details-simple-export" onClick={exportSimpleQr} disabled={isSimpleExporting}>
                      <RiDownloadLine /> {isSimpleExporting ? "Exporting..." : "Export PNG"}
                    </button>
                  </div>
                </div>
              </div>

              <section className="details-analytics">
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <p className="details-kicker">
                      Performance window
                    </p>
                    <h2 className="details-section-title">
                      Last {analytics?.days || 30} days
                    </h2>
                  </div>
                  <p className="details-unique-scans">
                    {analytics?.uniqueScans || 0} unique scans
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="details-chart-card lg:col-span-2">
                    <div className="details-line-chart">
                      <div className="details-chart-card-top"><span>Scan activity</span><span>Daily trend</span></div>
                      <svg viewBox="0 0 600 150" role="img" aria-label="Daily scan activity point chart" preserveAspectRatio="none">
                        <path d="M0 126 H600 M0 76 H600 M0 26 H600" className="details-chart-gridline" />
                        {analytics?.daily?.length ? (() => { const max = Math.max(...analytics.daily.map((item) => item.scans), 1); const points = analytics.daily.map((entry, index, entries) => { const x = entries.length === 1 ? 300 : 24 + (index / (entries.length - 1)) * 552; const y = 130 - (entry.scans / max) * 105; return { x, y, scans: entry.scans, date: entry.date }; }); const pointString = points.map((point) => `${point.x},${point.y}`).join(" "); return <><polyline points={pointString} className="details-chart-line" />{points.map((point) => <g key={`${point.x}-${point.y}`}><circle cx={point.x} cy={point.y} r="6" className="details-chart-point" /><text x={point.x} y={point.y - 14} textAnchor="middle" className="details-chart-value">{point.scans}</text></g>)}</>; })() : <text x="300" y="82" textAnchor="middle" className="details-chart-empty">No scan activity yet</text>}
                      </svg>
                    </div>
                    <div className="details-chart-dates">
                      <span>{analytics?.daily[0]?.date || "No data"}</span>
                      <span>
                        {analytics?.daily[analytics.daily.length - 1]?.date || ""}
                      </span>
                    </div>
                  </div>

                  <div className="details-device-card">
                    <p className="details-kicker">
                      Device mix
                    </p>
                    <div className="space-y-4">
                      {(analytics?.devices || []).map((device) => (
                        <div key={device.name} className="flex justify-between text-sm">
                          <span className="capitalize">{device.name}</span>
                          <span className="font-mono">{device.scans}</span>
                        </div>
                      ))}
                      {!analytics?.devices.length && (
                        <p className="text-sm text-gray-400">No scan data yet.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="details-sources-card">
                  <p className="details-kicker">
                    Traffic sources
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {(analytics?.referrers || []).map((referrer) => (
                      <div key={referrer.name} className="border-b border-gray-100 pb-3">
                        <p className="text-sm truncate" title={referrer.name}>{referrer.name}</p>
                        <p className="font-mono text-xs text-gray-400 mt-1">{referrer.scans} scans</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              </>
            )
          )}
        </main>
      </div>
    </div>
  );
}
