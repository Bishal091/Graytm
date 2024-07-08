import React, { useState, useEffect } from "react";
import { useAuth } from "../../src/store/auth";
import { NavLink, useLocation, Link } from "react-router-dom";
import navItems from "../Navbar/navItems";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, isLoggedIn } = useAuth();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(0);
  const [filteredNavItems, setFilteredNavItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      if (user.isAdmin) {
        setFilteredNavItems(
          navItems.filter(
            (item) => item.title !== "Login" && item.title !== "Register"
          )
        );
      } else {
        setFilteredNavItems(
          navItems.filter(
            (item) =>
              item.title !== "Login" &&
              item.title !== "Register" &&
              item.title !== "Admin"
          )
        );
      }
    } else {
      setFilteredNavItems(
        navItems.filter(
          (item) =>
            item.title !== "Admin" &&
            item.title !== "Logout" &&
            item.title !== "Transfer"
        )
      );
    }
  }, [user.isAdmin, isLoggedIn]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#3AA5A9] flex flex-col lg:flex-row  justify-between items-center lg:py-0 py-[1.5vh] p-2.5 sticky top-0 text-xl h-auto lg:h-[6.5vh] z-50">
      <div className="w-full lg:w-1/4 text-center flex justify-between lg:justify-start items-center">
        <div className="flex items-center lg:gap-[0.8vw] gap-[3vw] ">
          {isLoggedIn && (
            <div className=" w-40 h-40 lg:w-16 lg:h-16 rounded-full flex bg-[#2B7A78]">
              <div className="m-auto">
                {user.username ? (
                  <p className="text-[2.5vh] lg:text-[4vh]  p-2 m-auto">
                    {user.username.charAt(0).toUpperCase()}
                  </p>
                ) : (
                  <p className="text-[5vh] lg:text-[6vh] m-auto">-</p>
                )}
              </div>
            </div>
          )}
          <Link
            className="text-[2.5vh] lg:text-[4vh] my-auto   ml-[1vw] font-bold tracking-widest text-[#343736]"
            to="/graytm"
          >
            GRAYTM
          </Link>
        </div>
        <button
          className="lg:hidden text-[2vh] mr-[3vw]"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className={`w-full lg:flex    ${isMenuOpen ? 'flex mt-[2vh] gap-[3vw] lg-gap-[4vh] justify-between px-[3vw] lg:items-end items-center border-t-2 pt-[1vh] lg:border-none ' : 'hidden lg:flex gap-[3vw]  justify-end'}`}>
        {filteredNavItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.url}
            className={
                location.pathname === item.url
                  ? "border-b-3 border-black text-[#DEF2F1] no-underline font-semibold p-1 transition duration-300 text-[2vh] lg:text-[2.1vh] flex flex-row items-center justify-center lg:gap-[0.1vw] gap-[0.5vw]"
                : "no-underline text-black font-semibold p-1 hover:text-gray-600 transition duration-200 text-[2.3vh] lg:text-[2.6vh] flex flex-row items-center justify-center lg:gap-[0.1vw] gap-[0.5vw]"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            <i className={`${item.icon}`}></i>
            <span> </span>
            <span className="font-josefin text-[2vh]">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;