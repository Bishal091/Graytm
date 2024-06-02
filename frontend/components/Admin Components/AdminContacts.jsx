import React from 'react'
import { useAuth } from '../../src/store/auth'




const AdminContacts = () => {
    const {adminContactData} = useAuth();

if (!adminContactData) {
    // Handle the case where adminUserData is not available yet (loading state)
    return <p>You Are Not An Admin</p>;
  }
  
  if (!Array.isArray(adminContactData)) {
    // Handle the case where adminUserData is not an array
    console.error("adminUserData is not an array:", adminContactData);
    return <p>Error loading admin data</p>;
  }
  
  return (
    <div>
      {/* <h1>Contacts/Messages </h1>
      {adminContactData.map((currEle, index) => {
          const { email,message,username } =
            currEle;
          return ( */}
            {/* <div className="serv" key={index}>
              <p>
                hello {username},{email},{message}
              </p>
            </div> */}
          {/* );
        })} */} <div className="adminMain">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {adminContactData.map((currEle, index) => {
              const { email,message,username } =
            currEle;
              return (
                <tr key={index}>
                  {/* {username},{email},{phone} */}
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{message}</td>
                  <td>Edit</td>
                  <td>
                    <button
                      onClick={() => {
                        // deleteUser(_id);
                      }}
                    >
                      Delete{" "}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>


    </div>
  )
}

export default AdminContacts
