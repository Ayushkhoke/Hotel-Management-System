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
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authApi.jsx";
import { useDispatch } from "react-redux";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDashboard = () => {
    navigate("/dashboard");
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser(navigate));
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Avatar */}
      <img
        src="https://i.pravatar.cc/150?img=12"
        alt="Profile"
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full cursor-pointer
                   ring-2 ring-yellow-500 hover:ring-yellow-400
                   transition duration-200"
      />

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 top-full mt-3 w-48
                     bg-white rounded-xl shadow-xl
                     border z-[999]"
        >
          <button
            onClick={handleDashboard}
            className="w-full text-left px-4 py-2
                       text-black hover:bg-gray-100 transition"
          >
            🏠 Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2
                       text-red-500 hover:bg-red-50 transition"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  );
}