import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch("http://localhost:8000/graytm/user/register", {
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
    <div className="flex justify-center items-center min-h-screen bg-slate-500">
      <div className="w-full max-w-4xl mx-auto bg-emerald-200 rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8 bg-gradient-to-br from-emerald-200 to-emerald-400 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to GRAYTM</h1>
              <p className="text-lg text-gray-700 mb-4">Join us and experience seamless money transfers with top-notch security.</p>
              <img src="https://via.placeholder.com/300" alt="Illustration" className="w-full max-w-xs mx-auto rounded-lg shadow-lg" />
            </div>
          </div>
          <div className="md:w-1/2 p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 text-center">Register</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-gray-700 font-semibold">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  name="username"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  value={user.username}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="firstName" className="block text-gray-700 font-semibold">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  id="firstName"
                  name="firstName"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  value={user.firstName}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700 font-semibold">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  id="lastName"
                  name="lastName"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  value={user.lastName}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  value={user.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  value={user.password}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
};

export default Register;
