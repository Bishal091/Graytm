import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../src/store/auth";
const Login = () => {
  const { updateUserAdminStatus, isLoading, user, loginFunc } = useAuth();
  const navigate = useNavigate();
  const [userr, setUserr] = useState({
    email: "",
    password: "",
  });

  const { storeTokenInLocal } = useAuth();

  const handleChange = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUserr({
      ...userr,
      [name]: name === "phone" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("before", user);
    try {
      const response = await fetch("http://localhost:8000/graytm/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userr),
      });

      const res_data = await response.json();
      if (response.ok) {
        console.log("after", user);
        // <Navigate to="http://localhost:5173"/>
        // const responseData = await response.json();
        storeTokenInLocal(res_data.token);
        // console.log(res_data.token);
        // window.location.href = 'http://localhost:5173';
        setUserr({ email: "", password: "" });
        // console.log(responseData);
        // window.location.reload();
        //  window.location.href = '/';
        toast.success("Logged in Successfully");
        navigate("/graytm");
        // loginFunc();

        // updateUserAdminStatus(true);

        //  console.log(res_data)
        //  1st method: directly putting the token inside the local storage, but will be good if we do that using a function
        // localStorage.setItem("token",res_data.token)

        // 2nd method as this  will be good if we do that using a function, giveing the token value as a parameter to func
      } else {
        toast.error("Invalid E-mail or Password");
        setUserr({ email: "", password: "" });

        // console.log("error inside response ", response.statusText);
      }
    } catch (e) {
      console.error("Error", e);
    }
  };

  return (
    <>
      <div className="h-[90vh] flex items-center justify-center bg-gray-100">
       
          <div className="bg-green-300 h-[60vh] w-[50vw] rounded-lg shadow-lg  animate-fade-in-down">
            <div className=" grid grid-cols-2 h-full w-full ">
              <div className="w-[25vw] h-full bg-indigo-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className=" h-full fill-white"
                >
                  <path d="M344 144c-39.8 0-72 35.7-72 80 0 44.3 32.2 80 72 80s72-35.7 72-80c0-44.3-32.2-80-72-80zm-192 0c-39.8 0-72 35.7-72 80 0 44.3 32.2 80 72 80s72-35.7 72-80c0-44.3-32.2-80-72-80zm176 208c0 17.7-14.3 32-32 32H216c-17.7 0-32-14.3-32-32V200c0-4.4 3.6-8 8-8h8c4.4 0 8 3.6 8 8v152h184V200c0-4.4 3.6-8 8-8h8c4.4 0 8 3.6 8 8v152zm-79.5-155.8c-16.2-16.5-42.6-18.3-59.2-2.1l-53.8 52.8c-7.7 7.5-8.2 19.8-1.3 27.1l7.2 7.7c6.1 6.5 16.5 6.9 23.3.8l44.1-43.2c6.2-6.1 16.1-6.5 22.7-.9 6.6 5.6 7.2 15.5 1.1 21.6l-43.1 42.3c-6.1 6-6.7 15.9-1.5 22.5l7.3 9.3c4.2 5.3 11.6 7.8 18.5 5.9 41-11.2 74.3-44.3 85.7-85.3 2-7 .4-14.5-4.9-19.9l-7.3-6.7c-6.5-5.9-16.5-5.8-23.1.7zM224 456c-35.3 0-64-28.7-64-64 0-9.2 2-18.2 5.6-26.3 1.5-3.3 4.8-5.4 8.3-5.4h100.2c3.6 0 6.8 2.1 8.3 5.4 3.6 8.1 5.6 17.1 5.6 26.3 0 35.3-28.7 64-64 64z" />
                </svg>
              </div>
              <div className="w-full py-8 px-8 mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Login Form
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      E-Mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      required
                      autoComplete="off"
                      onChange={handleChange}
                      value={userr.email}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      required
                      autoComplete="off"
                      onChange={handleChange}
                      value={userr.password}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition-colors duration-300"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
       
      </div>
    </>
  );
};

export default Login;

// import React, { useState,useEffect } from 'react'
// import { useAuth } from "../src/store/auth";
// import {toast}  from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
// const navigate = useNavigate();
//   const[userr,setUserr]= useState({

//       email:'',
//       password:''
//     })

//     const {storeTokenInLocal,isAdminn}= useAuth();

//     const handleChange =(e)=>{

//       console.log(e);
//       let name= e.target.name;
//       let value = e.target.value;

//       setUserr({
//           ...userr,
//           [name]: name === 'phone' ? parseInt(value, 10) : value,
//       }
//       );
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       console.log(userr);

//       try {
//         const response = await fetch("http://localhost:8000/auth/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(userr),
//         });

//         const res_data = await response.json();
//         if (response.ok) {
//           // <Navigate to="http://localhost:5173"/>
//           // const responseData = await response.json();
//           storeTokenInLocal(res_data.token);
//           // window.location.href = 'http://localhost:5173';
//           setUserr({  email: "", password: "" });
//           // navigate("/");
//           // console.log(responseData);
//           // window.location.reload();
//            window.location.href = '/';
//           toast.success("Logged in Successfully");

//            //  console.log(res_data)
//     //  1st method: directly putting the token inside the local storage, but will be good if we do that using a function
//     // localStorage.setItem("token",res_data.token)

//     // 2nd method as this  will be good if we do that using a function, giveing the token value as a parameter to func
//         } else {
//           toast.error("Invalid E-mail or Password");
//           setUserr({  email: "", password: "" });

//           // console.log("error inside response ", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error", error);
//       }
//     };

//   return (
//     <>
//       <div className="login-main">
//         <div className="login-parent">
//            <section className='log-left'>
//             <img src="" alt="" srcSet="" />
//            </section>
//            <section className='log-right'>
//                <div className="log-form">
//                 <h2>Login Form</h2>
//                 <form onSubmit={handleSubmit}>

//                 <label htmlFor="email" >E-Mail
//                 </label>
//                   <input type="email" placeholder='Email'  id='email' name='email' required autoComplete='off' onChange={handleChange} value={userr.email}/><br />

//                 <label htmlFor="password" >Password
//                 </label>
//                   <input type="password" placeholder='Password' autoComplete='off' id='password'name='password' required  onChange={handleChange} value={userr.password} /><br />

//                   <br />

//                   <button type="submit" onSubmit={handleSubmit}>Login</button>
//                   </form>
//                </div>
//            </section>

//         </div>
//       </div>
//     </>
//   )
// }

// export default Login
