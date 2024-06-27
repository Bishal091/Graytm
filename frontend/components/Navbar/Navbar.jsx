import React, { useState, useEffect } from "react";
import { useAuth } from "../../src/store/auth";
import { NavLink, useLocation } from "react-router-dom";
import navItems from "../Navbar/navItems";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, isLoggedIn } = useAuth();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(0);
  const [filteredNavItems, setFilteredNavItems] = useState([]);

  useEffect(() => {
    // if(isLoading){
    //   console.log("LOADING ...");
    // }
    if (isLoggedIn) {
      if (user.isAdmin) {
        // Show all navItems except "Login" and "Register" for admin
        setFilteredNavItems(
          navItems.filter(
            (item) => item.title !== "Login" && item.title !== "Register"
          )
        );
        console.log("a1");
      } else {
        // Show only specific items for logged-in non-admin users
        setFilteredNavItems(
          navItems.filter(
            (item) =>
              item.title !== "Login" &&
              item.title !== "Register" &&
              item.title !== "Admin"
          )
        );
        console.log("a2");
      }
    } else {
      // Show only specific items for non-logged-in users
      setFilteredNavItems(
        navItems.filter(
          (item) =>
            item.title !== "Admin" &&
            item.title !== "Logout" &&
            item.title !== "Transfer"
        )
      );
      console.log("a3");
    }
  }, [user.isAdmin, isLoggedIn]);
  // const logoutYes = navItems.filter(item => item.title !== "Register" && item.title !== "Login" && item.title !== "Admin");
  // const logoutNo = navItems.filter(item => item.title !== "Logout" && item.title !== "Admin");
  // const adminYes = navItems.filter(item => item.title !== "Register" && item.title !== "Login");
  return (
    <>
      <nav className="bg-[#3AA5A9] flex justify-between items-center p-2.5 sticky top-0 text-2xl">
        <div className=" w-1/4 text-center flex">
          {isLoggedIn && (
            <div className=" w-20 h-20 rounded-full flex bg-[#2B7A78]">
              <div className=" text-[6vh] m-auto">
                {user.username ? (
                  <p className=" text-[5vh] p-2 m-auto">{`${user.username
                    .charAt(0)
                    .toUpperCase()}`}</p>
                ) : (
                  <p className=" text-[6vh] m-auto">-</p>
                )}
              </div>
            </div>
          )}
          <Link
            className="text-[5vh] my-auto ml-[1vw] font-bold tracking-widest text-[#343736] "
            to="/graytm"
          >
            GRAYTM
          </Link>

          {/* <h1 className='m-auto'>GRAYTM</h1> */}
        </div>
        <div className="w-full flex justify-end gap-[3vw]">
          {filteredNavItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.url}
              className={
                location.pathname === item.url
                  ? "border-b-3 border-black text-[#DEF2F1] no-underline font-semibold p-1 transition duration-300 text-[3.2vh] "
                  : "no-underline text-black font-semibold p-1 hover:text-gray-600 transition duration-200  text-[3.2vh] "
              }
            >
              <i className={item.icon}></i>
              <span> </span>
              {item.title}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

// import React, { useState,useEffect } from 'react'
// import { NavLink } from 'react-router-dom';
// import navItems from '../Navbar/navItems';
// import { useAuth } from "../../src/store/auth";

// const Navbar = () => {

//   const {isLoggedIn,isAdminn}= useAuth();
//   // const {isAdmin}= useAuth();
//   const [activeMenu, setActiveMenu] = useState(0);

//   // FILTER
// const logoutYes = navItems.filter(item => item.title !== "Register" && item.title !== "Login" && item.title !== "Admin");
// const logoutNo = navItems.filter(item => item.title !== "Logout" && item.title !== "Admin");
// const adminYes = navItems.filter(item => item.title !== "Register" && item.title !== "Login");

// // console.log("hello",isAdmin);
// // useEffect(() => {
// //   // Find the index of the admin item in navItems array
// //   const adminIndex = navItems.findIndex(item => item.title === "Admin");
// //   // Update activeMenu if user is admin and adminIndex is found
// //   if (isAdminn && adminIndex !== -1) {
// //     setActiveMenu(adminIndex);
// //   }
// // }, [isAdminn]);

//   return (<>

//   <nav className='nav-main bg-hero'>
//   <div className='nav-logo'>
//     <h1>LOGO</h1>
//   </div>
//   <div className='nav-items'>
{
  /* {navItems.map((item,index) =>{
    return(
      <ul key={index}>
        <NavLink  className={activeMenu === index ? "active-btn" : "nav-links"}
          onClick={() => setActiveMenu(index)} to={item.url}>
                  <i className={item.icon} ></i>
                  {item.title}

        </NavLink>
      </ul>
    )
  })} */
}
// {/*
//   {isLoggedIn
//   ?(
//     logoutYes.map((item,index) =>{
//     return(
//       <ul key={index}>
//         <NavLink  className={activeMenu === index ? "active-btn" : "nav-links"}
//           onClick={() => setActiveMenu(index)} to={item.url}>
//                   <i className={item.icon} ></i>
//                   {item.title}

//         </NavLink>
//       </ul>
//     )
//   }))
//   :(
//     logoutNo.map((item,index) =>{
//     return(
//       <ul key={index}>
//         <NavLink  className={activeMenu === index ? "active-btn" : "nav-links"}
//           onClick={() => setActiveMenu(index)} to={item.url}>
//                   <i className={item.icon} ></i>
//                   {item.title}

//         </NavLink>
//       </ul>
//     )
//   })
//   )
//   }
//   </div>
//   </nav>

//   </>
//   )
// }  */}

//  {isLoggedIn && isAdminn ? (
//         adminYes.map((item, index) => {
//           return (
//             <ul key={index}>
//               <NavLink
//                 className={activeMenu === index ? "active-btn" : "nav-links"}
//                 // onClick={() => setActiveMenu(index)}
//                 onClick={() => {

//                   if (item.title === "Logout") {
//       setActiveMenu(index-1); // Refresh the activeMenu option

//     } else {
//       setActiveMenu(index);
//       // Handle other navigation actions here
//     }
//                 }

//                  }
//                 to={item.url}
//               >
//                 <i className={item.icon}></i><span>      </span>
//                 {item.title}
//               </NavLink>
//             </ul>
//           );
//         })
//       ) : isLoggedIn && !isAdminn? (
//         logoutYes.map((item, index) => {
//           return (
//             <ul key={index}>
//               <NavLink
//                 className={activeMenu === index ? "active-btn" : "nav-links"}
//                 onClick={() => setActiveMenu(index)}
//                 to={item.url}
//               >
//                 <i className={item.icon} ></i><span>      </span>

//                 {item.title}
//               </NavLink>
//             </ul>
//           );
//         })
//       ) : (
//         logoutNo.map((item, index) => {
//           return (
//             <ul key={index}>
//               <NavLink
//                 className={activeMenu === index ? "active-btn" : "nav-links"}
//                 onClick={() => setActiveMenu(index)}

//                 to={item.url}

//               >
//                 <i className={item.icon}></i><span>      </span>
//                 {item.title}
//               </NavLink>
//             </ul>
//           );
//         })
//       )}
// </div>
// </nav>

//   </>
//   )
// }

// export default Navbar
