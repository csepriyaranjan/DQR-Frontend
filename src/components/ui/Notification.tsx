import { useEffect, useState } from "react";

interface NotificationData {
  message: string;
  type: "success" | "error" | "info";
}

export default function Notification() {
  const [notification, setNotification] = useState<NotificationData | null>(
    null,
  );

  useEffect(() => {
    const handler = (event: any) => {
      setNotification(event.detail);

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    };

    window.addEventListener("app-notify", handler);

    return () => {
      window.removeEventListener("app-notify", handler);
    };
  }, []);

  if (!notification) return null;

  const color =
    notification.type === "success"
      ? "bg-green-600"
      : notification.type === "error"
        ? "bg-red-600"
        : "bg-black";

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className={`text-white px-4 py-3 rounded shadow-lg ${color}`}>
        {notification.message}
      </div>
    </div>
  );
}
