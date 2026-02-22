// import React from 'react'

// export default function Slidebar() {
//   return (
//     <div className="bg-black text-white h-screen p-4 h-100vh w-[10%]">
//       Dashboard slidebar
//     </div>
//   )
// }

// import React, { useState } from "react";
// import { SIDEBAR_LINKS } from "../../data/sidebarLinks";
// import { Menu, ChevronLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function Sidebar() {
//   const [open, setOpen] = useState(true);
//   const navigate = useNavigate();

//   return (
//     <div
//       className={`h-screen bg-black text-white p-4 transition-all duration-300
//       ${open ? "w-64" : "w-16"}`}
//     >
//       {/* Toggle */}
//       <div className="flex justify-between items-center mb-8">
//         {open && <h1 className="text-xl font-bold">Dashboard</h1>}
//         <button onClick={() => setOpen(!open)}>
//           {open ? <ChevronLeft /> : <Menu />}
//         </button>
//       </div>

//       {/* Menu */}
//       <nav className="space-y-2">
//         {SIDEBAR_LINKS.map((item) => {
//           const Icon = item.icon;

//           return (
//             <div
//               key={item.id}
//               onClick={() => item.path && navigate(item.path)}
//               className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-800 transition"
//             >
//               <Icon size={20} />
//               {open && <span className="text-sm">{item.name}</span>}
//             </div>
//           );
//         })}
//       </nav>
//     </div>
//   );
// }


import React, { useState } from "react";
import { SIDEBAR_LINKS } from "../../data/sidebarLinks";
import { Menu, ChevronLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-lg shadow-lg"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-screen bg-black text-white
        transition-all duration-300 ease-in-out
        ${open ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-20"}
        md:${open ? "w-64" : "w-20"}
        shadow-2xl`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {open && <h1 className="text-lg font-semibold">Hotel Admin</h1>}

          <button
            onClick={() => setOpen(!open)}
            className="hidden md:block"
          >
            {open ? <ChevronLeft /> : <Menu />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {SIDEBAR_LINKS.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (item.path) navigate(item.path);
                  setOpen(false);
                }}
                className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200
                  ${active ? "bg-primary text-black font-semibold" : "hover:bg-gray-800"}
                `}
              >
                <Icon size={20} />
                {open && <span className="text-sm">{item.name}</span>}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}