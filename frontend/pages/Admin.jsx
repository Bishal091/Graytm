// import React from 'react'
// import { useAuth } from "../src/store/auth";


// const Admin = () => {
// // const {adminData}= useAuth();
// // if (!adminData) {
// //   // Handle the case where adminData is not available yet (loading state)
// //   return <p>You Are Not An Admin</p>;
// // }

// // if (!Array.isArray(adminData)) {
// //   // Handle the case where adminData is not an array
// //   console.error("adminData is not an array:", adminData);
// //   return <p>Error loading admin data</p>;
// // }

// //   return (
// //     <div>
// //       admin side
// //       <div className="adminMain">
// //         {adminData.map((currEle, index) => {
// //           const { email,phone,username } =
// //             currEle;
// //           return (
// //             <div className="serv" key={index}>
// //               <p>
// //                 hello {username},{email},{phone}
// //               </p>
// //             </div>
// //           );
// //         })}
// //       </div>

// //     </div>
// //   )
// <>



// </>
// }

// export default Admin


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
