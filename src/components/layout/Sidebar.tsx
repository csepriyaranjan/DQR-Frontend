import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  RiDashboardLine,
  RiQrCodeLine,
  RiLogoutBoxLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: RiDashboardLine },
    { path: "/create-qr", label: "Create QR", icon: RiQrCodeLine },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const SidebarContent = (
    <div className="w-64 bg-white h-full flex flex-col border-r border-gray-200">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-black">DQR</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  location.pathname === item.path
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="text-lg" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-4 mb-3">
          <p className="text-sm font-medium text-black">{user?.email}</p>
          <p className="text-xs text-gray-600 mt-1 capitalize">
            {user?.plan} Plan
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          <RiLogoutBoxLine className="text-lg" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-screen">{SidebarContent}</div>

      {/* Floating Button (Mobile Only) */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-50
        w-12 h-12 flex items-center justify-center
        rounded-full
        bg-red-100 backdrop-blur-md
        border border-white/40
        shadow-lg
        hover:bg-red-300/90
        transition"
      >
        <RiMenuLine className="text-xl text-black" />
      </button>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative">
            {SidebarContent}

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4"
            >
              <RiCloseLine className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
