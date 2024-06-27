import React, { useEffect } from "react";
import { useAuth } from "../src/store/auth";
import { Users } from "../components/Users";
import { FaWallet } from "react-icons/fa";

const Transfer = () => {
  const { user, balance, getBalance } = useAuth();

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="bg-neutral-800 min-h-screen text-white">
    <div className=" flex items-center justify-center mx-auto py-10 max-w-[80vw] mr-[7vw] ">
      <div className="flex justify-between items-start w-full">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg mx-auto w-[60vw]">
          <Users />
        </div>
  
        {balance !== null && (
          <div className="flex items-center gap-2 text-3xl mb-10  ">
            <FaWallet className="text-yellow-500" />
            <span>Balance: &#8377; {balance.toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  </div>
  
  );
};

export default Transfer;
