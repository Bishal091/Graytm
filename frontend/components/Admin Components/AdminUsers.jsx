
import React, { useState, useEffect } from "react";
import { useAuth } from "../../src/store/auth";
import {Link} from "react-router-dom";

const AdminUsers = () => {
  const { adminUserData, tokenval } = useAuth();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (adminUserData) {
      setUserData(adminUserData);
    }
  }, [adminUserData]);

  const deleteUser = async (id) => {
    if (!tokenval) {
      console.error("tokenval is undefined");
      return;
    }

    //console.log("Deleting user with id:", id);

    try {
      const dlt = await fetch(`http://localhost:8000/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenval}`,
        },
      });

      if (!dlt.ok) {
        console.error("Error deleting user:", dlt.status);
        return;
      }

      const responseData = await dlt.json();
      //console.log("User deleted successfully:", responseData);
      
      // Remove the deleted user from the state
      setUserData(userData.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      All the users
      <div className="adminMain">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>PhoneNumber</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((currEle, index) => {
              const {  _id,email, phone, username } = currEle;
              return (
                <tr key={index}>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  {/* <td><Link to={`http://localhost:8000/admin/users/${_id}/edit`}>Edit</Link>  </td> */}
                  <td><button>Edit</button></td>
                  <td>
                    <button
                      onClick={() => {
                        deleteUser(_id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;

















// import React from "react";
// import { useAuth } from "../../src/store/auth";

// const AdminUsers = () => {
//   const { adminUserData, tokenval } = useAuth();

  
//   if (!adminUserData) {
//     // Handle the case where adminUserData is not available yet (loading state)
//     return <p>You Are Not An Admin</p>;
//   }

//   if (!Array.isArray(adminUserData)) {
//     // Handle the case where adminUserData is not an array
//     console.error("adminUserData is not an array:", adminUserData);
//     return <p>Error loading admin data</p>;
//   }
//   // DELETE
//   // const deleteUser = async (id) => {
//   //   //console.log(id);
//   //   //console.log("tolken",tokenval);
//   //   try {
//   //     const dlt = await fetch(`http://localhost:8000/admin/users/delete/${id}`, {
//   //     method: "DELETE",
//   //     headers: {
//   //       Authorization: `Bearer ${tokenval}`, //as from postman and token is already fetched above from the user logged in
//   //     },
//   //   });
//   //   //console.log('Response:', dlt); 
//   //   const dData = await dlt.json();
//   //   //console.log(`users after  delete ${dData}`);
//   //   } catch (e) {  
//   //  //console.log(e);
//   //    }
    
//   // };
//   const deleteUser = async (id) => {
   
  
//     if (!tokenval) {
//       console.error("tokenval is undefined");
//       return;
//     }
    
//     //console.log("Deleting user with id:", id);
    
//     try {
//       const dlt = await fetch(`http://localhost:8000/admin/users/delete/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${tokenval}`,
//         },
//       });
  
//       if (!dlt.ok) {
//         console.error("Error deleting user:", dlt.status);
//         return;
//       }
  
//       const responseData = await dlt.json();
//       //console.log("User deleted successfully:", responseData);
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };
  

//   return (
//     <div>
//       All the users
//       <div className="adminMain">
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>PhoneNumber</th>
//               <th>Update</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {adminUserData.map((currEle, index) => {
//               const {  _id,email, phone, username } = currEle;
//               return (
//                 <tr key={index}>
//                   {/* {username},{email},{phone} */}
//                   <td>{username}</td>
//                   <td>{email}</td>
//                   <td>{phone}</td>
//                   {/* <td>{_id}</td> */}
//                   <td>Edit</td>
//                   <td>
//                     <button
//                       onClick={() => {
//                         deleteUser(_id);
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminUsers;
