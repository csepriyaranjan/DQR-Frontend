import { useNavigate } from "react-router-dom";
import type { QRCode as QRCodeType } from "../../data/mockData";
import { RiEditLine, RiFileListLine, RiDeleteBinLine } from "react-icons/ri";

interface QRTableProps {
  qrCodes: QRCodeType[];
  onEdit: (qrCode: QRCodeType) => void;
  onDelete: (qrId: string) => void;
}

export default function QRTable({ qrCodes, onEdit, onDelete }: QRTableProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                QR ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                Destination URL
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                Scan Count
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {qrCodes.map((qr) => (
              <tr key={qr.qrId} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 font-mono">
                  {qr.qrId}
                </td>

                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {qr.name}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                  {qr.destinationUrl}
                </td>

                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                  {qr.totalScans}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(qr)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <RiEditLine className="text-lg text-gray-700" />
                    </button>

                    <button
                      onClick={() => navigate(`/details/${qr.qrId}`)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                      title="Details"
                    >
                      <RiFileListLine className="text-lg text-gray-700" />
                    </button>

                    <button
                      onClick={() => onDelete(typeof qr.qrId === "string" ? qr.qrId : "")}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <RiDeleteBinLine className="text-lg text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {qrCodes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No QR codes yet. Create your first one!
          </p>
        </div>
      )}
    </div>
  );
}
