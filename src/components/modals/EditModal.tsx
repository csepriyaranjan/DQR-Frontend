import { useState } from "react";
import type { QRItem } from "../../data/mockData"; 
import { notify } from "../../utils/notify";
import { BiLoaderAlt } from "react-icons/bi";

interface EditModalProps {
  qrCode: QRItem;
  onClose: () => void;
  onUpdate: (qrId: string, destinationUrl: string) => Promise<void>; 
  maxUpdates: number;
}

export default function EditModal({
  qrCode,
  onClose,
  onUpdate,
  maxUpdates,
}: EditModalProps) {
  const [destinationUrl, setDestinationUrl] = useState(qrCode.destinationUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
   if ((qrCode.updateCount ?? 0) >= maxUpdates) {
     notify(`Update limit reached (${maxUpdates} updates max)`, "error");
     return;
   }

    if (!destinationUrl.trim()) {
      notify("Destination URL is required", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      await onUpdate(qrCode.qrId!, destinationUrl);
      // Success notify usually happens in the parent Dashboard
      // where the actual API logic lives, but we close here.
      onClose();
    } catch (err: any) {
      notify(err.message || "Update failed. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-black">Edit QR Code</h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <i className="ri-close-line text-xl text-gray-700"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              QR Code Name
            </label>
            <input
              type="text"
              value={qrCode.name}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Destination URL
            </label>
            <input
              type="url"
              value={destinationUrl}
              onChange={(e) => setDestinationUrl(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50"
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-3 text-sm flex justify-between items-center">
            <span className="text-gray-600 font-medium">Updates used</span>
            <span
              className={`font-bold ${ (qrCode.updateCount ?? 0) >= maxUpdates ? "text-red-600" : "text-black"}`}
            >
              {qrCode.updateCount} / {maxUpdates}
            </span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer disabled:bg-gray-600 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <BiLoaderAlt className="animate-spin text-lg" />
                  Saving...
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
