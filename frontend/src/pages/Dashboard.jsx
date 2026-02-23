// import React from 'react'
// import Profile from '../components/Dashboard/Profile.jsx'
// import { Outlet } from 'react-router-dom'
// import Slidebar from '../components/Dashboard/Slidebar.jsx'
// export default function Dashboard(){
//     return(
//         <div className="flex flex-direction-row bg-white z-1">
           
//                 <Slidebar />
            
            
//                 {/* // user profile  */}
                
//        <div className="flex-1 p-6 text-black">
//         <Outlet />
//       </div>
        
//         </div>
//     )
// }



// import React from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Dashboard/Slidebar";

// export default function Dashboard() {
//   return (
//     <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
//       <Sidebar />

//       <main className="flex-1 p-4 sm:p-6 md:p-8 transition-all duration-300">
//         <Outlet />
//       </main>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Slidebar";
import ProfileDropdown from "../components/comman/ProfileDropdown";
import { Menu, X } from "lucide-react";

export default function DashboardLayout() {
  const [open, setOpen] = useState(() => {
    if (typeof window !== "undefined") return window.innerWidth >= 768;
    return false;
  });

  // Ensure sidebar is visible when mounting on larger screens
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) setOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* TOP HEADER */}
      <header className="flex items-center justify-between 
                         bg-black text-white px-4 py-3 
                         shadow-md relative z-50">

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

     

      </header>

      {/* BODY SECTION */}
      <div className="flex flex-1 relative">

        {/* Overlay for mobile */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          ></div>
        )}

        {/* Sidebar */}
        <Sidebar open={open} setOpen={setOpen} />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}