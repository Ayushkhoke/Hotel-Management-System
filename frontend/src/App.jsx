import React, { lazy, Suspense } from 'react'
import './App.css'
import Navbar from './components/comman/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { Route, Routes } from 'react-router-dom'

// Lazy load all pages and components for better performance
const Home = lazy(() => import('./pages/Home.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Signup = lazy(() => import('./pages/Signup.jsx'))
const Verifyemail = lazy(() => import('./pages/Verifyemail.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const RoomContainer = lazy(() => import('./components/Dashboard/RoomContainer.jsx'))
const OrderContainer = lazy(() => import('./components/Dashboard/OrderContainer.jsx'))
const MenuContainer = lazy(() => import('./components/Dashboard/MenuContainer.jsx'))
const Profile = lazy(() => import('./components/Dashboard/Profile.jsx'))
const OrdersPage = lazy(() => import('./components/Dashboard/Orderpage.jsx'))
const RoomBooked = lazy(() => import('./components/Dashboard/RoomBooked.jsx'))
const TableBooked = lazy(() => import('./components/Dashboard/TableBooked.jsx'))
const Tablebooked = lazy(() => import('./components/Dashboard/tablebooking/tablebooked.jsx'))
const Setting = lazy(() => import('./components/Dashboard/Setting.jsx'))
const ChangePassword = lazy(() => import('./pages/ChangePassword.jsx'))
const RoomBookingPage = lazy(() => import('./components/Dashboard/RoomBookingPage.jsx'))
const TableBookingPage = lazy(() => import('./components/Dashboard/TableBookingPage.jsx'))
const AiChat = lazy(() => import('./pages/AiComponent.jsx'))
const ContactUs = lazy(() => import('./pages/ContactUs.jsx'))
const Tablecontainer = lazy(() => import('./components/Dashboard/Tablecontainer.jsx'))

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
  </div>
) 
function App() {
  

  return (
    <>
      <div className='w-full min-h-screen bg-black text-white pt-16'>
         <Navbar />
         
         <Suspense fallback={<PageLoader />}>
         <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/verifyemail' element={<Verifyemail/>}/>
           <Route path='/contact-us' element={<ContactUs/>}/>
          

          <Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<Profile />} />   
  <Route path="my-profile" element={<Profile />} />
  <Route path="table" element={<Tablecontainer />} />
  <Route path="settings" element={<Setting/>} />
  <Route path="room" element={<RoomContainer/>} />
  <Route path="menu" element={<MenuContainer/>} />
  <Route path="order" element={<OrderContainer/>} />
  <Route path="orders" element={<OrdersPage />} />
  <Route path="my-room-bookings" element={<RoomBooked />} />
  <Route path="my-table-bookings" element={<TableBooked />} />
  
</Route>

         <Route path="/dashboard/roombooked"  element={<RoomBooked/>}/>
         <Route path="/dashboard/roombooking" element={<RoomBookingPage/>} />
         <Route path="/dashboard/tablebooked"  element={<Tablebooked/>}/>
         <Route path="/dashboard/tablebooking" element={<TableBookingPage/>} />
         <Route path="/change-password"  element={<ChangePassword/>}/>
         <Route path="/aichat"  element={<AiChat/>}/>
         </Routes>
         </Suspense>
        
      </div>

      <Footer />
    </>
  )
}

export default App
