import React from 'react'
import Profile from '../components/Dashboard/Profile.jsx'
import { Outlet } from 'react-router-dom'
import Slidebar from '../components/Dashboard/Slidebar.jsx'
export default function Dashboard(){
    return(
        <div className="flex flex-direction-row bg-white z-1">
           
                <Slidebar />
            
            
                {/* // user profile  */}
                
       <div className="flex-1 p-6 text-black">
        <Outlet />
      </div>
        
        </div>
    )
}
