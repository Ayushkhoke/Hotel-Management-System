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


// import React, { useState } from "react";
// import { SIDEBAR_LINKS } from "../../data/sidebarLinks";
// import { Menu, ChevronLeft } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function Sidebar() {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   return (
//     <>
//       {/* Mobile Toggle */}
//       <button
//         onClick={() => setOpen(true)}
//         className="md:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-lg shadow-lg"
//       >
//         <Menu size={22} />
//       </button>

//       {/* Overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/50 md:hidden z-40"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed md:static top-0 left-0 z-50 h-screen bg-black text-white
//         transition-all duration-300 ease-in-out
//         ${open ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-20"}
//         md:${open ? "w-64" : "w-20"}
//         shadow-2xl`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-700">
//           {open && <h1 className="text-lg font-semibold">Hotel Admin</h1>}

//           <button
//             onClick={() => setOpen(!open)}
//             className="hidden md:block"
//           >
//             {open ? <ChevronLeft /> : <Menu />}
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="p-4 space-y-2">
//           {SIDEBAR_LINKS.map((item) => {
//             const Icon = item.icon;
//             const active = location.pathname === item.path;

//             return (
//               <div
//                 key={item.id}
//                 onClick={() => {
//                   if (item.path) navigate(item.path);
//                   setOpen(false);
//                 }}
//                 className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200
//                   ${active ? "bg-primary text-black font-semibold" : "hover:bg-gray-800"}
//                 `}
//               >
//                 <Icon size={20} />
//                 {open && <span className="text-sm">{item.name}</span>}
//               </div>
//             );
//           })}
//         </nav>
//       </aside>
//     </>
//   );
// }

// import React, { useState } from "react";
// import { SIDEBAR_LINKS } from "../../data/sidebarLinks";
// import { Menu, ChevronLeft } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function Sidebar() {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   return (
//     <>
//       {/* Mobile Toggle */}
//       <button
//         onClick={() => setOpen(true)}
//         className="md:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-lg shadow-lg"
//       >
//         <Menu size={22} />
//       </button>

//       {/* Overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/50 md:hidden z-40"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed md:static top-0 left-0 z-50 h-screen bg-black text-white
//         transition-all duration-300 ease-in-out
//         ${open ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-20"}
//         md:${open ? "w-64" : "w-20"}
//         shadow-2xl`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-700">
//           {open && <h1 className="text-lg font-semibold">Hotel Admin</h1>}

//           <button
//             onClick={() => setOpen(!open)}
//             className="hidden md:block"
//           >
//             {open ? <ChevronLeft /> : <Menu />}
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="p-4 space-y-2">
//           {SIDEBAR_LINKS.map((item) => {
//             const Icon = item.icon;
//             const active = location.pathname === item.path;

//             return (
//               <div
//                 key={item.id}
//                 onClick={() => {
//                   if (item.path) navigate(item.path);
//                   setOpen(false);
//                 }}
//                 className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200
//                   ${active ? "bg-primary text-black font-semibold" : "hover:bg-gray-800"}
//                 `}
//               >
//                 <Icon size={20} />
//                 {open && <span className="text-sm">{item.name}</span>}
//               </div>
//             );
//           })}
//         </nav>
//       </aside>
//     </>
//   );
// }




import React, { useEffect, useState } from "react";
import { SIDEBAR_LINKS } from "../../data/sidebarLinks";
import { Menu, ChevronLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Close drawer after route changes on mobile to keep navigation smooth.
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (window.innerWidth >= 768) return;

    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-20 left-4 z-[80] 
        bg-gradient-to-r from-amber-500 to-yellow-600 
        text-black p-2 rounded-lg shadow-lg"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed top-16 left-0 right-0 bottom-0 bg-black/60 backdrop-blur-sm md:hidden z-[70]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-16 md:top-0 left-0 z-[75] md:z-auto h-[calc(100vh-4rem)] md:h-screen
        bg-gradient-to-b from-[#0f172a] via-[#020617] to-black
        border-r border-gray-800 text-gray-300
        transition-all duration-300 ease-in-out
        ${open ? "translate-x-0 w-[82vw] max-w-[320px]" : "-translate-x-full md:translate-x-0 md:w-20"}
        md:${open ? "w-64" : "w-20"}
        shadow-[0_0_40px_rgba(0,0,0,0.6)]`}
      >

        {/* Header */}
        <div className={`flex items-center p-5 border-b border-gray-800 ${!open ? 'justify-center' : 'justify-between'}`}>
          {open && (
            <h1 className="text-lg font-semibold tracking-wider text-amber-400">
              Luxury Hotel
            </h1>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="hidden md:flex items-center justify-center
            w-9 h-9 rounded-lg hover:bg-gray-800 transition"
          >
            {open ? <ChevronLeft /> : <Menu />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 mt-4 space-y-2">
          {SIDEBAR_LINKS.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (item.path) navigate(item.path);
                  // Only close on mobile
                  if (window.innerWidth < 768) setOpen(false);
                }}
                title={!open ? item.name : ''}
                className={`relative group flex items-center rounded-xl
                cursor-pointer transition-all duration-300
                ${open ? 'gap-4 p-3' : 'justify-center p-3'}
                ${
                  active
                    ? "bg-amber-500/10 text-amber-400"
                    : "hover:bg-white/5"
                }`}
              >
                {/* Active indicator */}
                {active && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-amber-400 rounded-full"></div>
                )}

                <Icon
                  size={20}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                {open && (
                  <span className="text-sm font-medium tracking-wide">
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        {open && (
          <div className="absolute bottom-6 left-0 w-full px-5 text-xs text-gray-500">
            © 2026 Luxury Hotel Admin
          </div>
        )}
      </aside>
    </>
  );
}