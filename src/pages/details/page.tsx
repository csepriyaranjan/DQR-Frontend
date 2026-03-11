import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import { qrApi } from "../../api/qrApi";
import { useAuth } from "../../context/AuthContext";
import { notify } from "../../utils/notify"; // Import notify
import { BiLoaderAlt } from "react-icons/bi"; // Import Loader icon

import {
  RiArrowLeftLine,
  RiDownloadLine,
  RiExternalLinkLine,
  RiTimeLine,
  RiStackLine,
} from "react-icons/ri";

export default function Details() {
  const { qrId } = useParams();
  const navigate = useNavigate();
  const { authFetch } = useAuth();

  const [qrCode, setQrCode] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchQR = async () => {
      try {
        setLoading(true);

        const data = await qrApi.getOne(authFetch, qrId!);

        setQrCode(data);
      } catch (err: any) {
        notify(err.message || "Failed to fetch QR code details", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchQR();
  }, [qrId, authFetch]);

  const downloadQR = async () => {
    if (!qrRef.current) return;
    try {
      const dataUrl = await toPng(qrRef.current, {
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = `${qrCode?.name || "qr-code"}.png`;
      link.href = dataUrl;
      link.click();
      notify("Asset exported successfully", "success");
    } catch (err) {
      notify("Export failed", "error");
    }
  };

  return (
    <div className="flex h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto border-l border-gray-100">
        <Header
          title={loading ? "Loading..." : qrCode?.name}
          subtitle="Analytics & Identity"
        />

        <main className="p-8 lg:p-16 max-w-6xl w-full mx-auto">
          {/* Persistent Navigation */}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-xs font-bold uppercase hover:opacity-50 transition-opacity mb-12"
          >
            <RiArrowLeftLine /> Back to Dashboard
          </button>

          {loading ? (
            /* Scoped Loading State */
            <div className="flex flex-col items-center justify-center py-24">
              <BiLoaderAlt className="w-12 h-12 animate-spin mb-4" />
              <p className="font-mono text-xs tracking-widest uppercase text-gray-400">
                Retrieving Matrix Data...
              </p>
            </div>
          ) : (
            qrCode && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 animate-in fade-in duration-500">
                {/* Metadata Section */}
                <div className="lg:col-span-7 space-y-12">
                  <section>
                    <h1 className="text-5xl font-black tracking-tighter mb-2">
                      {qrCode.name}
                    </h1>
                    <p className="font-mono text-sm text-gray-400">
                      UUID: {qrCode.qrId}
                    </p>
                  </section>

                  <div className="grid grid-cols-2 gap-px bg-gray-100 border border-gray-100">
                    <div className="bg-white p-8">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-bold">
                        Total Scans
                      </p>
                      <p className="text-4xl font-light italic">
                        {qrCode.totalScans}
                      </p>
                    </div>
                    <div className="bg-white p-8">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-bold">
                        Daily Volume
                      </p>
                      <p className="text-4xl font-light italic">
                        {qrCode.todayScans}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 pt-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <RiExternalLinkLine /> Target
                      </span>
                      <a
                        href={qrCode.destinationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium hover:underline truncate max-w-[250px]"
                      >
                        {qrCode.destinationUrl}
                      </a>
                    </div>

                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <RiTimeLine /> Created
                      </span>
                      <span className="text-sm font-medium">
                        {new Date(qrCode.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <RiStackLine /> Revisions
                      </span>
                      <span className="text-sm font-medium">
                        {qrCode.updateCount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* QR Visual Section */}
                <div className="lg:col-span-5">
                  <div className="border-[12px] border-black p-8 flex flex-col items-center">
                    <div ref={qrRef} className="bg-white p-4 mb-8">
                      <QRCode
                        value={qrCode.shortUrl}
                        size={200}
                        fgColor="#000000"
                        bgColor="#FFFFFF"
                        level="H"
                      />
                    </div>

                    <button
                      onClick={downloadQR}
                      className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.3em] hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                    >
                      <RiDownloadLine size={16} />
                      Export Asset
                    </button>

                    <p className="mt-6 text-[10px] leading-relaxed text-gray-400 text-center uppercase tracking-widest">
                      Validated Matrix Code <br />
                      Property of {qrCode.name.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </main>
      </div>
    </div>
  );
}
