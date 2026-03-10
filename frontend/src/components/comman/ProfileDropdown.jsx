import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authApi.jsx";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const [menuStyle, setMenuStyle] = useState({ top: 0, left: 0, width: 224 });

  function updateMenuPosition() {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = 224;
    const viewportWidth = window.innerWidth;
    const left = Math.max(12, Math.min(rect.right - menuWidth, viewportWidth - menuWidth - 12));

    setMenuStyle({
      top: rect.bottom + 10,
      left,
      width: menuWidth,
    });
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const target = event.target;
      const clickedTrigger = triggerRef.current?.contains(target);
      const clickedDropdown = dropdownRef.current?.contains(target);
      const clickedMenu = menuRef.current?.contains(target);

      if (!clickedTrigger && !clickedDropdown && !clickedMenu) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    updateMenuPosition();

    function handleViewportChange() {
      updateMenuPosition();
    }

    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [open]);

  const handleDashboard = () => {
    navigate("/dashboard");
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser(navigate));
    setOpen(false);
  };

  const firstName = user?.firstname || user?.firstName || "User";
  const lastName = user?.lastname || user?.lastName || "";
  const profileImage =
    user?.image ||
    `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(firstName)}`;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Avatar */}
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 focus:outline-none group"
        aria-label="User menu"
        aria-expanded={open}
      >
        <img
          src={profileImage}
          alt="Profile"
          className="w-10 h-10 rounded-full cursor-pointer border-2 border-green-500 
                     group-hover:border-green-600 transition-all duration-200 
                     shadow-sm group-hover:shadow-md"
        />
      </button>

      {/* Dropdown Menu */}
      {open && createPortal(
        <div
          ref={menuRef}
          className="fixed bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          style={{ top: menuStyle.top, left: menuStyle.left, width: menuStyle.width, zIndex: 110 }}
        >
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {firstName} {lastName}
            </p>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {user?.email || "user@example.com"}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={handleDashboard}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 
                         hover:bg-gray-50 transition-colors duration-150 
                         flex items-center gap-3"
            >
              <span className="text-lg">🏠</span>
              <span className="font-medium">Dashboard</span>
            </button>

            <div className="border-t border-gray-100 my-1"></div>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2.5 text-sm text-red-600 
                         hover:bg-red-50 transition-colors duration-150 
                         flex items-center gap-3"
            >
              <span className="text-lg">🚪</span>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}