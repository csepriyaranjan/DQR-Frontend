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
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Update failed. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-modal-backdrop">
      <div className="edit-modal animate-in fade-in zoom-in duration-200">
        <div className="edit-modal-header">
          <div><p className="details-kicker">Update destination</p><h2>Edit QR code</h2></div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="edit-modal-close"
          >
            <i className="ri-close-line text-xl text-gray-700"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="edit-modal-label">
              QR Code Name
            </label>
            <input
              type="text"
              value={qrCode.name}
              disabled
              className="edit-modal-input edit-modal-input-disabled"
            />
          </div>

          <div>
            <label className="edit-modal-label">
              Destination URL
            </label>
            <input
              type="url"
              value={destinationUrl}
              onChange={(e) => setDestinationUrl(e.target.value)}
              disabled={isSubmitting}
              className="edit-modal-input"
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="edit-modal-limit">
            <span>Updates used</span>
            <span
              className={`${ (qrCode.updateCount ?? 0) >= maxUpdates ? "edit-modal-limit-danger" : ""}`}
            >
              {qrCode.updateCount} / {maxUpdates}
            </span>
          </div>

          <div className="edit-modal-actions">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="edit-modal-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="edit-modal-save"
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
