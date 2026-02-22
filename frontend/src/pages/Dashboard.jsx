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



import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Slidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}