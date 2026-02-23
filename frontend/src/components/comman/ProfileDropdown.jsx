// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {logoutUser} from '../../services/authApi.jsx';
// import { useDispatch } from "react-redux";
// export default function ProfileDropdown() {
//   const [open, setOpen] = useState(false);
//     const dispatch=useDispatch();
    
// const navigate=useNavigate();
//   function dashboardhandler(){
//     console.log("dashboard clicked");
//     navigate("/dashboard");
//   }
//     function changehandler(){
//         console.log("logout clicked");
//         dispatch(logoutUser(navigate));
        
//     }
//   return (
    
//     <div className="relative inline-block text-left z-2">
//       {/* Avatar */}
//       <img
//         src="https://i.pravatar.cc/150?img=12"
//         alt="Profile"
//         onClick={() => setOpen(!open)}
//         className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-indigo-500 hover:ring-indigo-600 transition"
//       />

//       {/* Dropdown */}
//       {open && (
//         <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border animate-fade-in">
//         {/* //move to dash board */}
//         <div>
//             <button className="text-black " onClick={dashboardhandler}>
//               🏠 Dashboard
//             </button>
//             </div>

//           <div className="border-t" onClick={changehandler}>
//             <button className="dropdown-item text-red-500">
//               🚪 Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>

//   );
// }

import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authApi.jsx";
import { useDispatch } from "react-redux";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const dropdownElRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const wrapperContains = wrapperRef.current && wrapperRef.current.contains(event.target);
      const dropdownContains = dropdownElRef.current && dropdownElRef.current.contains(event.target);

      if (!wrapperContains && !dropdownContains) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Track mobile breakpoint so we can position the dropdown outside header flow
  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 768);
    }

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleDashboard = () => {
    navigate("/dashboard");
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser(navigate));
    setOpen(false);
  };

  // compute portal position for dropdown
  const [dropdownStyle, setDropdownStyle] = useState({});

  useEffect(() => {
    if (open && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const left = rect.right - 192; // dropdown width ~192px (w-48)
      const top = rect.bottom + 8; // small gap
      setDropdownStyle({ position: "absolute", left: `${left}px`, top: `${top}px` });
    }
  }, [open, isMobile]);

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Profile Avatar */}
      <img
        src="https://i.pravatar.cc/150?img=12"
        alt="Profile"
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full cursor-pointer
                   ring-2 ring-yellow-500 hover:ring-yellow-400
                   transition duration-200"
      />

      {/* Dropdown (portal to body to avoid clipping) */}
      {open &&
        ReactDOM.createPortal(
          <div
            ref={dropdownElRef}
            style={isMobile ? {} : dropdownStyle}
            className={`${isMobile ? "fixed right-4 top-16 mt-0 w-48" : "w-48"} bg-white rounded-md shadow-xl z-[999]`} 
          >
            <button
              onClick={handleDashboard}
              className="w-full text-left px-4 py-2 text-black hover:bg-gray-100 transition"
            >
              🏠 Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition"
            >
              🚪 Logout
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}