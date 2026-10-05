import { useNavigate } from "react-router-dom";
import type { QRItem as QRCodeType } from "../../data/mockData";
import { RiEditLine, RiFileListLine, RiDeleteBinLine } from "react-icons/ri";

interface QRTableProps {
  qrCodes: QRCodeType[];
  onEdit: (qrCode: QRCodeType) => void;
  onDelete: (qrId: string) => void;
  selectedQrId?: string;
  onSelect: (qrCode: QRCodeType) => void;
}

export default function QRTable({ qrCodes, onEdit, onDelete, selectedQrId, onSelect }: QRTableProps) {
  const navigate = useNavigate();

  return (
    <div className="app-table-wrap">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">
                QR ID
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Name
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Destination URL
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Scan Count
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {qrCodes.map((qr) => (
              <tr
                key={qr.qrId}
                onClick={() => onSelect(qr)}
                className={`cursor-pointer transition-colors ${selectedQrId === qr.qrId ? "bg-[#e9ede6]" : "hover:bg-[#f4f5f0]"}`}
              >
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
                      onClick={(event) => {
                        event.stopPropagation();
                        onEdit(qr);
                      }}
                      className="app-table-action p-2 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <RiEditLine className="text-lg text-gray-700" />
                    </button>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/details/${qr.qrId}`);
                      }}
                      className="app-table-action p-2 transition-colors cursor-pointer"
                      title="Details"
                    >
                      <RiFileListLine className="text-lg text-gray-700" />
                    </button>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        onDelete(typeof qr.qrId === "string" ? qr.qrId : "");
                      }}
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
