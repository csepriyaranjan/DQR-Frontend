import { useEffect, useState } from "react";
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
import { notify } from "../../utils/notify"; // Using your utility

export default function Dashboard() {
  const { user, authFetch } = useAuth();
  const [qrCodes, setQrCodes] = useState<QRItem[]>([]);
  const [editingQR, setEditingQR] = useState<QRItem | null>(null);

  // Scoped loading state
  const [isLoading, setIsLoading] = useState(true);

  const totalScans = qrCodes.reduce((sum, qr) => sum + qr.totalScans, 0);
  const todayScans = qrCodes.reduce((sum, qr) => sum + qr.todayScans, 0);

 const fetchQRCodes = async (showSilence = false) => {
   try {
     if (!showSilence) setIsLoading(true);
     const data = await qrApi.getAll(authFetch);
     setQrCodes(data); 
   } catch (err: any) {
     notify(err.message || "Failed to fetch QR codes", "error");
   } finally {
     setIsLoading(false);
   }
 };;

  useEffect(() => {
    fetchQRCodes();
  }, []);

  const handleUpdate = async (qrId: string, destinationUrl: string) => {
    try {
      await qrApi.update(authFetch, qrId, destinationUrl);
      setEditingQR(null);
      notify("QR updated successfully", "success");
      fetchQRCodes(true); // Fetch silently so the loader doesn't flicker
    } catch (err: any) {
      notify(err.message || "Update failed", "error");
    }
  };

  const handleDelete = async (qrId: string) => {
    if (!confirm("Are you sure you want to delete this QR code?")) return;
    try {
      await qrApi.delete(authFetch, qrId);
      notify("QR deleted successfully", "success");
      fetchQRCodes(true);
    } catch (err: any) {
      notify(err.message || "Delete failed", "error");
    }
  };

  const maxUpdates =
    user?.plan === "pro"
      ? PLAN_LIMITS.pro.maxUpdates
      : PLAN_LIMITS.free.maxUpdates;

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Dashboard"
          subtitle="Overview of your QR codes and analytics"
        />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {isLoading ? (
            /* Scoped Loading UI */
            <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
              <BiLoaderAlt className="w-10 h-10 text-blue-500 animate-spin" />
              <p className="mt-4 text-gray-500 animate-pulse">
                Syncing your data...
              </p>
            </div>
          ) : (
            <>
              {/* Stats Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                <StatsCard
                  title="Total QR Codes"
                  value={qrCodes.length.toLocaleString()}
                  icon={BiQr}
                />
                <StatsCard
                  title="Total Scans"
                  value={totalScans.toLocaleString()}
                  icon={BiQrScan}
                />
                <StatsCard
                  title="Today Scans"
                  value={todayScans.toLocaleString()}
                  icon={BiAbacus}
                />
              </div>

              {/* Table Section */}
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-black mb-4">
                  Your QR Codes
                </h2>
                <div className="overflow-x-auto bg-gray-50 rounded-xl border border-gray-100">
                  <QRTable
                    qrCodes={qrCodes}
                    onEdit={setEditingQR}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
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
