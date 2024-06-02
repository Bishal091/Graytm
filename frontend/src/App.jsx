import React from 'react'
import { Route,Routes,BrowserRouter } from "react-router-dom"
import Home from '../pages/Home'
import Service from '../pages/Service'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Navbar from '../components/Navbar/Navbar'
import Error from '../pages/Error'
import Logout from '../pages/Logout'
import Admin from '../pages/Admin'
import AdminUsers from '../components/Admin Components/AdminUsers'
import AdminContacts from '../components/Admin Components/AdminContacts'
import { SendMoney } from '../pages/SendMoney'
import { useAuth } from './store/auth'
import Transfer from '../pages/Transfer'





const App = () => {
   
  const {user}= useAuth();
  return (
    <>
    <BrowserRouter>

    {/* <Navbar/> */}
    <Navbar/>
    <Routes>
    <Route path='/' element={ <Home/>}/>
      <Route path='/graytm' element={ <Home/>}/>
      {/* <Route path='/about' element={ <About/>}/> */}
      {/* <Route path='/service' element={ <Service/>}/> */}
      <Route path='/graytm/contact' element={ <Contact/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/graytm/register' element={ <Register/>}/>
      <Route path='/graytm/login' element={ <Login/>}/>
      <Route path="/send" element={<SendMoney />} />
      <Route path="/graytm/transfer" element={<Transfer/>} />
      {/* {user.isAdmin && ( // Render admin routes only if isAdminn is true
            <Route path='/admin' element={<Admin />}>
              <Route path='users' element={<AdminUsers />} />
              <Route path='contacts' element={<AdminContacts />} /> */}
              {/* <Route path='services' element={<AdminUsers/>}/> */}
            {/* </Route>
          )} */}
      <Route path='*' element={<Error/>}/>
    </Routes>

    </BrowserRouter>
  
    </>
  )
}

export default App;