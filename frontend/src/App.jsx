import React from 'react'


import './App.css'
import Navbar from './components/comman/Navbar.jsx'
import{Route,Routes} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Verifyemail from './pages/Verifyemail.jsx' 
import Dashboard from './pages/Dashboard.jsx'
import RoomContainer from './components/Dashboard/RoomContainer.jsx'
import OrderContainer from './components/Dashboard/OrderContainer.jsx'
 import MenuContainer from './components/Dashboard/MenuContainer.jsx'
import Profile from './components/Dashboard/Profile.jsx'
import OrdersPage from './components/Dashboard/Orderpage.jsx'
import RoomBooked from './components/Dashboard/RoomBooked.jsx'
import Tablebooked from './components/Dashboard/tablebooking/tablebooked.jsx'
import Setting from './components/Dashboard/Setting.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
// import AiChat from './pages/AiComponent.jsx'
// import settings from './components/Dashboard/settings.jsx'
 import Tablecontainer from './components/Dashboard/Tablecontainer.jsx' 
function App() {
  

  return (

     
    <div className='w-full min-h-screen bg-black text-white pt-16'>
         <Navbar />
         
         <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/verifyemail' element={<Verifyemail/>}/>
          

          <Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<Profile />} />   
  <Route path="my-profile" element={<Profile />} />
  <Route path="table" element={<Tablecontainer />} />
  <Route path="settings" element={<Setting/>} />
  <Route path="room" element={<RoomContainer/>} />
  <Route path="menu" element={<MenuContainer/>} />
  <Route path="order" element={<OrderContainer/>} />
  <Route path="orders" element={<OrdersPage />} />
  
</Route>

         <Route path="/dashboard/roombooked"  element={<RoomBooked/>}/>
         <Route path="/dashboard/tablebooked"  element={<Tablebooked/>}/>
         <Route path="/change-password"  element={<ChangePassword/>}/>
         {/* <Route path="/Aichat"  element={<AiChat/>}/> */}
         </Routes>
         <h1>App Component</h1>
      </div>
    
      
      
    
  )
}

export default App
