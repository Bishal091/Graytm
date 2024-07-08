import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SiNotepadplusplus, SiTheregister } from "react-icons/si";
import { FaClipboardCheck, FaWallet } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: name === 'phone' ? parseInt(value, 10) : value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/graytm/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      if (response.ok) {
        setUser({ username: "", email: "", firstName: "", lastName: "", password: "" });
        toast.success("Registration Successful");
        navigate("/graytm/login");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
  
        <div className="flex justify-center items-start lg:items-center pt-[5vh] lg:pt-0 h-screen bg-gradient-to-r from-gray-700 to-gray-900 bg-[length:200%_200%] animate-gradient-x">
          <div className="w-full lg:max-w-[60vw] max-w-[80vw] mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="lg:flex">
              <div className="lg:w-1/2 p-8 bg-gradient-to-br from-[#0D3B66] to-[#1E2A78] flex items-center justify-center">
                <div className="text-center p-3">
                  <h1 className="text-[3vh] font-extrabold text-white mb-6 animate-fade-in">
                    Welcome to GRAYTM
                  </h1>
                  <p className="text-[1.6vh] italic text-white mb-8 animate-fade-in">
                    Join us and experience seamless money transfers with top-notch security.
                  </p>
                  <FaWallet className="w-20 h-20 mt-[5vh] mx-auto text-white animate-bounce" />
                </div>
              </div>
              <div className="lg:w-1/2 p-8 bg-white">
                <div className="mb-10">
                  <h2 className="text-[3vh] font-bold text-gray-800 text-center">Register</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="username" className="block text-gray-700 lg:text-[1.8vh] text-[2.5vh] font-semibold">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Username"
                      id="username"
                      name="username"
                      required
                      autoComplete="off"
                      onChange={handleChange}
                      value={user.username}
                      className="w-full px-4 py-2 text-[1.8vh]  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700  lg:text-[1.8vh] text-[2.5vh] font-semibold">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      id="firstName"
                      name="firstName"
                      required
                      autoComplete="off"
                      onChange={handleChange}
                      value={user.firstName}
                      className="w-full px-4 py-2 text-[1.8vh] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 lg:text-[1.8vh] text-[2.5vh]  font-semibold">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      id="lastName"
                      name="lastName"
                      required
                      autoComplete="off"
                      onChange={handleChange}
                      value={user.lastName}
                      className="w-full px-4 py-2 border text-[1.8vh]  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 lg:text-[1.8vh] text-[2.5vh]  font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      name="email"
                      required
                      autoComplete="off"
                      onChange={handleChange}
                      value={user.email}
                      className="w-full px-4 py-2 text-[1.8vh]  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-gray-700 lg:text-[1.8vh] text-[2.5vh]  font-semibold">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Create Password"
                      id="password"
                      name="password"
                      required
                      autoComplete="off"
                      onChange={handleChange}
                      value={user.password}
                      className="w-full px-4 py-2  text-[1.8vh] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                    className="w-full p-4 lg:text-[1.8vh] text-[2.5vh] mt-[3vh] bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }

export default Register;
