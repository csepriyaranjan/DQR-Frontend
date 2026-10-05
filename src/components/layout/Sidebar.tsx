import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  RiDashboardLine,
  RiQrCodeLine,
  RiPaletteLine,
  RiBankCardLine,
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
    { path: "/brand-studio", label: "Brand Studio", icon: RiPaletteLine },
    { path: "/payment", label: "Plans & payment", icon: RiBankCardLine },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const SidebarContent = (
    <div className="app-sidebar">
      {/* Logo */}
      <div className="app-logo">
        <div className="auth-brand"><span className="auth-brand-icon"><RiQrCodeLine /></span>QRFlow</div>
      </div>

      {/* Menu */}
      <nav className="app-nav">
        <div>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                className={`app-nav-button ${
                    location.pathname === item.path || (item.path === "/brand-studio" && location.pathname.startsWith("/brand-studio"))
                    ? "active"
                    : ""
                }`}
              >
                <Icon className="text-lg" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* User */}
      <div>
        <div className="app-user">
          <p className="app-user-email">{user?.email}</p>
          <p className="app-user-plan">
            {user?.plan} Plan
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="app-logout"
        >
          <RiLogoutBoxLine className="text-lg" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="app-sidebar-slot hidden lg:flex">{SidebarContent}</div>

      {/* Floating Button (Mobile Only) */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-[#c8ef4d] border border-[#153d2a] shadow-lg"
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
          <div className="app-drawer">
            {SidebarContent}

            <button
              onClick={() => setOpen(false)}
              className="app-drawer-close"
              aria-label="Close navigation"
            >
              <RiCloseLine className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
