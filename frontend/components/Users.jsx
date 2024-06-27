import React, { useEffect, useState } from "react";
import { useAuth } from "../src/store/auth";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

export const Users = () => {
  const { tokenval,user } = useAuth();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;

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
    (currentPage + 1) * usersPerPage
  );

  return (
    <div className="text-white">
      <div className="text-6xl mb-4 text-center">Transfer Money</div>
      <div className="text-center ">
          {user ? (
            <p className="text-[3vh]">
            
              <span className="text-yellow-500">
                {`${user.username.charAt(0).toUpperCase()}${user.username.slice(1)}`}
              </span>, Send money to any user you like .

            </p>
          ) : (
            <p className="text-5xl">Welcome to GRAYTM</p>
          )}
        </div>
      <div className="mb-[1vh] flex items-center justify-center ">
        <input
          type="text"
          placeholder="Search users..."
          className="w-[80%]   px-4 py-2 text-2xl border rounded-lg bg-gray-700 border-gray-500"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
     
      
      <div className="text-3xl text-yellow-500 text-left pl-3 p-4 rounded-md w-[40vw] mx-auto mb-2">All Users</div>
      <div className="max-h-[55vh] overflow-y-auto no-scrollbar mb-4">
        {displayedUsers.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(users.length / usersPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center py-4"}
        pageClassName={"mx-2"}
        pageLinkClassName={"px-4 py-2 bg-gray-700 text-white rounded-md"}
        previousLinkClassName={"px-4 py-2 bg-gray-700 text-white rounded-md"}
        nextLinkClassName={"px-4 py-2 bg-gray-700 text-white rounded-md"}
        activeLinkClassName={"bg-gray-900"}
        disabledLinkClassName={"opacity-50 cursor-not-allowed"}
      />
    </div>
  );
};

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto  flex items-center justify-center " >
    <div className="flex  justify-between items-center w-[40vw] mb-[1vh] bg-blue-200 rounded-3xl p-4">
      <div className="flex gap-[0.6vw] ">
        <div className="rounded-full h-12 w-12 bg-cyan-400 flex justify-center ">
          <div className="flex flex-col justify-center h-full  text-xl">
            {user.firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col text-gray-900 text-2xl justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center h-full">
        <Button
          onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
    </div>
  );
};
