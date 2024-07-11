import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../src/store/auth";
import { FaLongArrowAltLeft } from "react-icons/fa";

const Login = () => {
  const { updateUserAdminStatus, user, loginFunc } = useAuth();
  const navigate = useNavigate();
  const [userr, setUserr] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { storeTokenInLocal } = useAuth();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserr({
      ...userr,
      [name]: name === "phone" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://graytm-wallet.onrender.com/graytm/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userr),
      });

      const res_data = await response.json();
      if (response.ok) {
        storeTokenInLocal(res_data.token);
        setUserr({ email: "", password: "" });
        toast.success("Logged in Successfully");
        navigate("/graytm");
      } else {
        toast.error("Invalid E-mail or Password");
        setUserr({ email: "", password: "" });
      }
    } catch (e) {
      console.error("Error", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-600 to-gray-800 bg-[length:200%_200%] animate-gradient-x">
        <div className="lg:w-[50vw] w-[88vw]  h-[60vh]  rounded-lg shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row h-full ">
            <div className="lg:w-2/5 bg-[#78a2af] flex items-center justify-center p-6 lg:p-0 lg:h-full h-[30%]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-full h-full lg:h-64 fill-white"
              >
                <path d="M344 144c-39.8 0-72 35.7-72 80 0 44.3 32.2 80 72 80s72-35.7 72-80c0-44.3-32.2-80-72-80zm-192 0c-39.8 0-72 35.7-72 80 0 44.3 32.2 80 72 80s72-35.7 72-80c0-44.3-32.2-80-72-80zm176 208c0 17.7-14.3 32-32 32H216c-17.7 0-32-14.3-32-32V200c0-4.4 3.6-8 8-8h8c4.4 0 8 3.6 8 8v152h184V200c0-4.4 3.6-8 8-8h8c4.4 0 8 3.6 8 8v152zm-79.5-155.8c-16.2-16.5-42.6-18.3-59.2-2.1l-53.8 52.8c-7.7 7.5-8.2 19.8-1.3 27.1l7.2 7.7c6.1 6.5 16.5 6.9 23.3.8l44.1-43.2c6.2-6.1 16.1-6.5 22.7-.9 6.6 5.6 7.2 15.5 1.1 21.6l-43.1 42.3c-6.1 6-6.7 15.9-1.5 22.5l7.3 9.3c4.2 5.3 11.6 7.8 18.5 5.9 41-11.2 74.3-44.3 85.7-85.3 2-7 .4-14.5-4.9-19.9l-7.3-6.7c-6.5-5.9-16.5-5.8-23.1.7zM224 456c-35.3 0-64-28.7-64-64 0-9.2 2-18.2 5.6-26.3 1.5-3.3 4.8-5.4 8.3-5.4h100.2c3.6 0 6.8 2.1 8.3 5.4 3.6 8.1 5.6 17.1 5.6 26.3 0 35.3-28.7 64-64 64z" />
              </svg>
            </div>
            <div className="lg:w-3/5 bg-gradient-to-r from-green-500 to-[#409DB9] bg-[length:200%_200%] animate-gradient-x  p-8 lg:p-12 h-full">
              <h2 className="text-[4vh] lg:text-[4.5vh]  mb-6 text-gray-800 mx-auto text-center">Login Form</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block font-medium text-gray-700 lg:text-[1.8vh] text-[2.5vh] mb-2"
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
                    className="w-full px-4 py-2 lg:text-[1.8vh] text-[2.5vh] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="mb-[6vh]">
                  <label
                    htmlFor="password"
                    className="block font-medium text-gray-700 lg:text-[1.8vh] text-[2.5vh]  mb-2"
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
                    className="w-full px-4 py-2 lg:text-[1.8vh] text-[2.5vh] mb-[10vh]  rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className=" grid grid-cols-2 gap-[1vw]">

                <button
                  type="submit"
                  className={`w-full  px-4 lg:text-[1.8vh] text-[2.5vh] rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Logging In...</span>
                      <svg 
  className="animate-spin lg:h-[1.8vh] lg:w-[1.8vh] h-[2.2vh] w-[2.2vh] text-white" 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24"
>
  <circle 
    className="opacity-25" 
    cx="12" 
    cy="12" 
    r="10" 
    stroke="currentColor" 
    strokeWidth="4"
  ></circle>
  <path 
    className="opacity-75" 
    fill="currentColor" 
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  ></path>
</svg>

                    </div>
                  ) : (
                    'Login'
                  )}
                </button>
                <button
                      // onClick={navigatesR}
                      onClick={(e) => {
            navigate("/graytm/register");
          }}
                      className="hover:bg-[#a99e9e] pr-5 hover:text-black  lg:text-[1.5vh] text-[2.1vh] rounded-lg bg-gradient-to-br from-[#0D3B66] to-[#bbbcc7] flex text-center justify-center items-center "
                    >
                      <FaLongArrowAltLeft className="lg:size-10 size-30" />
                     Register
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
