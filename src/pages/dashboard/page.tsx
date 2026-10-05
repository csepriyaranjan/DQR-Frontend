import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import { PLAN_LIMITS } from "../../data/mockData.ts";
import type { QRItem} from "../../data/mockData.ts";
import StatsCard from "../../components/dashboard/StatsCard.tsx";
import QRTable from "../../components/dashboard/QRTable.tsx";
import EditModal from "../../components/modals/EditModal.tsx";
import { BiQr, BiQrScan, BiAbacus, BiLoaderAlt } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";
import { qrApi } from "../../api/qrApi";
import type { QRAnalytics } from "../../api/qrApi";
import { notify } from "../../utils/notify"; // Using your utility
import { RiArrowRightLine, RiBarChartBoxLine, RiSparklingLine } from "react-icons/ri";

export default function Dashboard() {
  const { user, authFetch } = useAuth();
  const navigate = useNavigate();
  const [qrCodes, setQrCodes] = useState<QRItem[]>([]);
  const [editingQR, setEditingQR] = useState<QRItem | null>(null);
  const [selectedQR, setSelectedQR] = useState<QRItem | null>(null);
  const [analytics, setAnalytics] = useState<QRAnalytics | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  // Scoped loading state
  const [isLoading, setIsLoading] = useState(true);

  const totalScans = qrCodes.reduce((sum, qr) => sum + (qr.totalScans ?? 0), 0);
 const todayScans = qrCodes.reduce((sum, qr) => sum + (qr.todayScans ?? 0), 0);

 const fetchQRCodes = async (showSilence = false) => {
   try {
     if (!showSilence) setIsLoading(true);
     const data = await qrApi.getAll(authFetch);
     setQrCodes(data);
     setSelectedQR((current) =>
       current ? data.find((qr) => qr.qrId === current.qrId) || data[0] || null : data[0] || null,
     );
   } catch (err: unknown) {
     notify(err instanceof Error ? err.message : "Failed to fetch QR codes", "error");
   } finally {
     setIsLoading(false);
   }
 };;

  useEffect(() => {
    fetchQRCodes();
  }, []);

    useEffect(() => {
      if (!selectedQR?.qrId) {
        setAnalytics(null);
        return;
      }

      const fetchAnalytics = async () => {
        try {
          setAnalyticsLoading(true);
          setAnalytics(await qrApi.getAnalytics(authFetch, selectedQR.qrId!, 30));
        } catch (err: unknown) {
          notify(err instanceof Error ? err.message : "Failed to fetch analytics", "error");
        } finally {
          setAnalyticsLoading(false);
        }
      };

      fetchAnalytics();
    }, [selectedQR?.qrId, authFetch]);

  const handleUpdate = async (qrId: string, destinationUrl: string) => {
    try {
      await qrApi.update(authFetch, qrId, destinationUrl);
      setEditingQR(null);
      notify("QR updated successfully", "success");
      fetchQRCodes(true); // Fetch silently so the loader doesn't flicker
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Update failed", "error");
    }
  };

  const handleDelete = async (qrId: string) => {
    if (!confirm("Are you sure you want to delete this QR code?")) return;
    try {
      await qrApi.delete(authFetch, qrId);
      notify("QR deleted successfully", "success");
      fetchQRCodes(true);
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Delete failed", "error");
    }
  };

  const maxUpdates =
    user?.plan === "pro"
      ? PLAN_LIMITS.pro.maxUpdates
      : PLAN_LIMITS.free.maxUpdates;

  return (
    <div className="app-page-shell">
      <Sidebar />

      <div className="app-page-main">
        <Header
          title="Dashboard"
          subtitle="Overview of your QR codes and analytics"
        />

        <div className="flex-1 overflow-y-auto bg-[#f4f5f0] p-4 sm:p-6 md:p-8">
          {isLoading ? (
            /* Scoped Loading UI */
            <div className="flex flex-col items-center justify-center h-full min-h-100">
              <BiLoaderAlt className="w-10 h-10 text-blue-500 animate-spin" />
              <p className="mt-4 text-gray-500 animate-pulse">
                Syncing your data...
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#153d2a]">
                    Signal dashboard
                  </p>
                  <h1 className="max-w-2xl text-4xl font-black leading-[0.96] tracking-[-0.07em] text-[#111512] sm:text-6xl">
                    See what your codes are <em className="font-normal text-[#153d2a]">doing.</em>
                  </h1>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-[#69716a]">
                    A focused view of your QR network, scan momentum, and the next useful action.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#69716a]">
                  <span className="h-2 w-2 rounded-full bg-[#c8ef4d]" />
                  Live from your scan activity
                </div>
              </div>

              <div className="mb-8 grid grid-cols-1 gap-px bg-[#dfe4dc] sm:grid-cols-3">
                <StatsCard title="Total QR Codes" value={qrCodes.length.toLocaleString()} icon={BiQr} />
                <StatsCard title="Total Scans" value={totalScans.toLocaleString()} icon={BiQrScan} />
                <StatsCard title="Today Scans" value={todayScans.toLocaleString()} icon={BiAbacus} />
              </div>

              {/* Table Section */}
              <div className="mb-6">
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#69716a]">Your network</p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight text-[#111512]">QR codes</h2>
                  </div>
                  <span className="font-mono text-xs text-[#69716a]">{qrCodes.length} active</span>
                </div>
                <div className="overflow-x-auto border border-[#dfe4dc] bg-white">
                  <QRTable
                    qrCodes={qrCodes}
                    onEdit={setEditingQR}
                    onDelete={handleDelete}
                    selectedQrId={selectedQR?.qrId}
                    onSelect={setSelectedQR}
                  />
                </div>
              </div>

              {selectedQR && (
                <section className="mt-12 grid grid-cols-1 gap-8 xl:grid-cols-[1.35fr_0.65fr]">
                  <div className="bg-[#153d2a] p-6 text-white sm:p-8">
                    <div className="mb-10 flex items-start justify-between gap-4">
                      <div>
                        <div className="mb-3 flex items-center gap-2 text-[#c8ef4d]">
                          <RiBarChartBoxLine />
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Selected signal</span>
                        </div>
                        <h2 className="text-3xl font-black tracking-[-0.05em]">{selectedQR.name}</h2>
                      </div>
                      <button onClick={() => navigate(`/details/${selectedQR.qrId}`)} className="flex items-center gap-2 border-b border-[#9db49f] pb-1 text-xs font-bold text-[#dce5d9] hover:text-[#c8ef4d]">
                        Full report <RiArrowRightLine />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-6 border-t border-[#40634e] pt-6 sm:grid-cols-4">
                      <div><p className="text-[10px] uppercase tracking-widest text-[#a9beb0]">30 day</p><strong className="mt-2 block text-3xl tracking-tight">{analyticsLoading ? "--" : analytics?.uniqueScans || 0}</strong></div>
                      <div><p className="text-[10px] uppercase tracking-widest text-[#a9beb0]">Devices</p><strong className="mt-2 block text-3xl tracking-tight">{analyticsLoading ? "--" : analytics?.devices.length || 0}</strong></div>
                      <div><p className="text-[10px] uppercase tracking-widest text-[#a9beb0]">Sources</p><strong className="mt-2 block text-3xl tracking-tight">{analyticsLoading ? "--" : analytics?.referrers.length || 0}</strong></div>
                      <div><p className="text-[10px] uppercase tracking-widest text-[#a9beb0]">Today</p><strong className="mt-2 block text-3xl tracking-tight">{selectedQR.todayScans || 0}</strong></div>
                    </div>
                    <div className="mt-8 flex h-28 items-end gap-1 border-t border-[#40634e] pt-5">
                      {(analytics?.daily || []).map((entry) => {
                        const max = Math.max(...(analytics?.daily || []).map((item) => item.scans), 1);
                        return <div key={entry.date} title={`${entry.date}: ${entry.scans} scans`} className="flex-1 bg-[#c8ef4d] opacity-80 hover:opacity-100" style={{ height: `${Math.max((entry.scans / max) * 100, 4)}%` }} />;
                      })}
                    </div>
                  </div>
                  <div className="border border-[#dfe4dc] bg-white p-6 sm:p-8">
                    <div className="mb-8 flex items-center gap-2 text-[#153d2a]"><RiSparklingLine /><span className="text-[10px] font-bold uppercase tracking-[0.2em]">Make it yours</span></div>
                    <h2 className="text-2xl font-black tracking-tight text-[#111512]">Custom branding & exports</h2>
                    <p className="mt-3 text-sm leading-6 text-[#69716a]">Create a recognizable version of this code for menus, packaging, or campaigns.</p>
                    {user?.plan === "pro" ? (
                      <button onClick={() => navigate(`/details/${selectedQR.qrId}#brand-studio`)} className="mt-6 flex items-center gap-2 text-xs font-bold text-[#153d2a] underline underline-offset-4">Open brand studio <RiArrowRightLine /></button>
                    ) : (
                      <p className="mt-6 text-xs font-bold uppercase tracking-[0.12em] text-[#69716a]">Available on Pro</p>
                    )}
                  </div>
                </section>
              )}

            </>
          )}
        </div>
      </div>

      {editingQR && (
        <EditModal
          qrCode={editingQR}
          onClose={() => setEditingQR(null)}
          onUpdate={handleUpdate}
          maxUpdates={maxUpdates}
        />
      )}
    </div>
  );
}
