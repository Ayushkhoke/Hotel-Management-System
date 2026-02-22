// import React from 'react'

// export default function Slidebar() {
//   return (
//     <div className="bg-black text-white h-screen p-4 h-100vh w-[10%]">
//       Dashboard slidebar
//     </div>
//   )
// }
import React, { useState } from "react";
import { SIDEBAR_LINKS } from "../../data/sidebarLinks";
import { Menu, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div
      className={`h-screen bg-black text-white p-4 transition-all duration-300
      ${open ? "w-64" : "w-16"}`}
    >
      {/* Toggle */}
      <div className="flex justify-between items-center mb-8">
        {open && <h1 className="text-xl font-bold">Dashboard</h1>}
        <button onClick={() => setOpen(!open)}>
          {open ? <ChevronLeft /> : <Menu />}
        </button>
      </div>

      {/* Menu */}
      <nav className="space-y-2">
        {SIDEBAR_LINKS.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={() => item.path && navigate(item.path)}
              className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-800 transition"
            >
              <Icon size={20} />
              {open && <span className="text-sm">{item.name}</span>}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
