


import React from 'react'
import { Link ,Outlet} from 'react-router-dom';

// import AdminUsers from '../components/Admin Components/adminUsers';

const Admin = () => {
 
  return (
    <div>
      <h1>Admin</h1>

      <nav className=' bg-'>
        <ul>
          <li><Link to="/admin/users">Users</Link></li>
          <li><Link to="/admin/contacts">Contacts</Link></li>
          <li><Link to="/admin/services">Services</Link></li>
          <li><Link to="/admin">Home</Link></li>
        </ul>

      </nav>
      {/* <h2><Link to="/admin/users">Users</Link></h2> */}
      <Outlet />
    </div>
  )
}

export default Admin;
