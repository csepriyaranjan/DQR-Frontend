import { useState } from "react";
import QRCode from "react-qr-code";
import { useAuth } from "../../context/AuthContext";
import { qrApi } from "../../api/qrApi";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import { notify } from "../../utils/notify";
import { BiClipboard, BiLoaderAlt, BiCheck } from "react-icons/bi";

export default function CreateQR() {
  const { authFetch } = useAuth();

  const [name, setName] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [createdQR, setCreatedQR] = useState<{
    qrId: string;
    shortUrl: string;
  } | null>(null);

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newQR = { name, destinationUrl };

    try {
      const qr = await qrApi.create(authFetch, newQR);
      setCreatedQR({
        qrId: qr.qrId ?? "",
        shortUrl: qr.shortUrl ?? "",
      });
      setName("");
      setDestinationUrl("");
      notify("QR Code created successfully!", "success");
    } catch (err) {
      console.error(err);
      notify("Failed to create QR code. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (!createdQR) return;
    navigator.clipboard.writeText(createdQR.shortUrl);
    setCopied(true);
    notify("URL copied to clipboard", "success");
    setTimeout(() => setCopied(false), 2000);
  };

 const downloadQR = () => {
   const svg = document.getElementById("qr-code") as SVGSVGElement | null;
   if (!svg) return;

   const svgData = new XMLSerializer().serializeToString(svg);

   const canvas = document.createElement("canvas");
   const ctx = canvas.getContext("2d");

   if (!ctx) {
     console.error("Canvas context not available");
     return;
   }

   const img = new Image();

   img.onload = () => {
     canvas.width = 256;
     canvas.height = 256;

     ctx.drawImage(img, 0, 0);

     const pngFile = canvas.toDataURL("image/png");

     const downloadLink = document.createElement("a");
     downloadLink.download = `${createdQR?.qrId || "qrcode"}.png`;
     downloadLink.href = pngFile;
     downloadLink.click();
   };

   img.src =
     "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
 };


  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Create QR Code"
          subtitle="Generate a new dynamic QR code"
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-black mb-6">
                    QR Code Details
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        QR Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        disabled={isSubmitting}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all disabled:bg-gray-50"
                        placeholder="e.g., Summer Campaign"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Destination URL
                      </label>
                      <input
                        type="url"
                        value={destinationUrl}
                        disabled={isSubmitting}
                        onChange={(e) => setDestinationUrl(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all disabled:bg-gray-50"
                        placeholder="https://your-website.com"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:bg-gray-700"
                    >
                      {isSubmitting ? (
                        <>
                          <BiLoaderAlt className="animate-spin text-xl" />
                          Creating...
                        </>
                      ) : (
                        "Create QR Code"
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Preview Section */}
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                {createdQR ? (
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-black mb-6">
                      QR Code Preview
                    </h2>

                    <div className="bg-white border border-gray-100 rounded-lg p-8 mb-6 flex items-center justify-center shadow-inner">
                      <div id="qr-code-preview">
                        <QRCode
                          value={createdQR.shortUrl}
                          size={256}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Short URL
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={createdQR.shortUrl}
                            readOnly
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 text-sm font-mono"
                          />
                          <button
                            onClick={handleCopy}
                            className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            {copied ? (
                              <BiCheck className="text-green-600" size={20} />
                            ) : (
                              <BiClipboard size={20} />
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={downloadQR}
                        className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                      >
                        <i className="ri-download-line text-lg"></i>
                        Download PNG
                      </button>

                      <button
                        onClick={() => setCreatedQR(null)}
                        className="w-full border border-gray-300 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        Create Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <i className="ri-qr-code-line text-4xl text-gray-300"></i>
                    </div>
                    <p className="text-gray-500 font-medium">
                      Fill in the details to generate <br /> your dynamic QR
                      code.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
