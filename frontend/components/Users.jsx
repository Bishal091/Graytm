import React, { useEffect, useState } from "react";
import { useAuth } from "../src/store/auth";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

export const Users = () => {
  const { tokenval, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 6;
  const userMobile = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/graytm/user/bulk", {
          headers: { Authorization: `Bearer ${tokenval}` },
          params: { filter },
        });
        setUsers(response.data.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [filter]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedUsers = users.slice(

    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage,

    
  );
  const displayedUsersMobile = users.slice(

   
    currentPage * userMobile,
    (currentPage + 1) * userMobile
    
  );
  return (
    <div className="text-white p-4 sm:p-6 md:p-8 lg:p-10  bg-gradient-to-br from-gray-900 to-gray-800 h-[95vh]">
      <div className="text-[3.5vh] font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-600">Transfer Money</div>
      <div className="text-center mb-8">
        {user ? (
          <p className="text-[2.2vh] sm:text-[2.4vh] md:text-[2.6vh]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-600 font-semibold">
              {`${user.username.charAt(0).toUpperCase()}${user.username.slice(1)}`}
            </span>, Send money to any User you want.
          </p>
        ) : (
          <p className="text-[3vh] sm:text-[3.5vh] md:text-[4vh] font-bold">Welcome to GRAYTM</p>
        )}
      </div>
      <div className="mb-6 flex items-center justify-center">
        <div className="relative w-full sm:w-[90%] md:w-[80%] lg:w-[70%]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className=" lg:size-7 size-28 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m2.4-6.55a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-[7vw] lg:pl-10 px-4 py-3 text-[2vh] sm:text-[2.2vh] md:text-[2.4vh] border rounded-lg bg-gray-700 border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-300"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      
      <div className="text-[2.2vh]  font-bold text-yellow-500 text-left pl-3 p-4 rounded-md w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto mb-4">All Users</div>
      <div className=" overflow-y-auto no-scrollbar mb-6 flex-grow hidden lg:block">
        {displayedUsers.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
        {displayedUsers.length === 0 && <p className="text-[2.2vh] mx-auto text-center">No User Found</p>}
      </div>
      <div className=" overflow-y-auto no-scrollbar mb-6 flex-grow lg:hidden">
        {displayedUsersMobile.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
        {displayedUsers.length === 0 && <p className="text-[2.2vh] mx-auto text-center">No User Found</p>}
      </div>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(users.length / usersPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"flex flex-wrap justify-center py-4 gap-2"}
        pageClassName={"m-1"}
        pageLinkClassName={"px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-yellow-500 hover:text-black transition duration-300 text-[1.8vh]"}
        previousLinkClassName={"px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-yellow-500 hover:text-black transition duration-300 text-[1.8vh]"}
        nextLinkClassName={"px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-yellow-500 hover:text-black transition duration-300 text-[1.8vh]"}
        activeLinkClassName={"bg-yellow-500 text-black"}
        disabledLinkClassName={"opacity-50 cursor-not-allowed"}
      />
    </div>
  );
};

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex items-stretch justify-center mb-4">
    <div className="flex  flex-row justify-between items-center w-full sm:w-[90%] md:w-[80%] lg:w-[70%] bg-gradient-to-r from-blue-200 to-blue-300 rounded-xl p-4 py-[1vh] shadow-lg hover:shadow-xl transition duration-300">
      <div className="flex items-center gap-4 mb-3 sm:mb-0 flex-grow">
        <div className="rounded-full lg:w-14 lg:h-14 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 flex-shrink-0 flex justify-center items-center text-white font-bold shadow-md">
          <div className="lg:text-[2.4vh] text-[1.8vh]">
            {user.firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center text-gray-900 text-[2.2vh] sm:text-[2.4vh] font-semibold">
          <div className="break-words">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      
      <div className="mt-3 sm:mt-0 flex-shrink-0">
        {/* <button
          onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          label={"Send Money"}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full transition duration-300 lg:text-[2vh] whitespace-nowrap"
        /> */}
            <button
               onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
               
          className=" hover:text-black hover:bg-yellow-300  py-2 px-4 rounded-md transition duration-300 text-[1.8vh] lg:text-[2vh] whitespace-nowrap"
       
              >
                Send Money
              </button>
      </div>
    </div>
  </div>
  );
};