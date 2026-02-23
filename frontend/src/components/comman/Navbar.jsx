// import react from 'react'

// import { Link, NavLink } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import ProfileDropdown from './ProfileDropdown'
// export default function Navbar() {
// const{token}=useSelector((state)=>state.auth)

//     return (
//         <div className='w-11/12 flex   justify-between items-center px-6 py-4 bg-gray-800 text-white '>
//            <nav className=" w-11/12 flex gap-4 justify-center items-center">
//             <NavLink  to="/">Home</NavLink >
//             <NavLink to="/login">Login</NavLink>
//             <NavLink to="/signup">Signup</NavLink>
//             <NavLink to="/verifyemail">Verify Email</NavLink>
//              <NavLink to="/dashboard">Dashboard</NavLink>
//            </nav>

//            {

//             token===null &&(
//                 <>
//                 <Link to="/login">
//                 <button>Login</button>
//                 </Link>
                
//                 <Link to="/signup">
//                 <button>Signup</button>
//                 </Link>
//                 </>
//             )
//               }
//           {
//             token!==null &&(
//                 <div>
//                      <ProfileDropdown />
//                <button>
                
//                </button>
//                     </div>
              
//             )       
//           }

//         </div>
//     )
// }


import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navStyle =
    "relative text-sm font-medium tracking-wide hover:text-yellow-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-yellow-500/20 text-white ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-yellow-400 tracking-wider"
        >
          Royal Grand
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 items-center relative">
          <NavLink to="/" className={navStyle}>
            Home
          </NavLink>

          {!token && (
            <>
              <NavLink to="/login" className={navStyle}>
                Login
              </NavLink>
              <NavLink to="/signup" className={navStyle}>
                Signup
              </NavLink>
            </>
          )}

          {token && (
            <>
              <NavLink to="/dashboard" className={navStyle}>
                Dashboard
              </NavLink>

              {/* Profile Dropdown */}
              <div className="relative">
                <ProfileDropdown />
              </div>
            </>
          )}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-yellow-500/20 px-6 py-6 space-y-6 text-center">

          <NavLink
            to="/"
            className="block hover:text-yellow-400 transition"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </NavLink>

          {!token && (
            <>
              <NavLink
                to="/login"
                className="block hover:text-yellow-400 transition"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="block hover:text-yellow-400 transition"
                onClick={() => setMobileOpen(false)}
              >
                Signup
              </NavLink>
            </>
          )}

          {token && (
            <>
              <NavLink
                to="/dashboard"
                className="block hover:text-yellow-400 transition"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </NavLink>

              <div className="flex justify-center mt-4">
                <ProfileDropdown />
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}