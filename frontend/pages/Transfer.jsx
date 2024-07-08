import React, { useEffect } from "react";
import { useAuth } from "../src/store/auth";
import { Users } from "../components/Users";
import { FaWallet } from "react-icons/fa";

const Transfer = () => {
  const { user, balance, getBalance } = useAuth();

  useEffect(() => {
    getBalance();
  }, [user]);

  return (
    <div className="bg-neutral-800 min-h-screen text-white">
    <div className=" flex items-center justify-center mx-auto py-10 lg:max-w-[80vw] lg:mr-[7vw] ">
      <div className="flex justify-between items-start w-full">
        <div className="bg-gradient-to-r from-[#61b3ff] to-[#37449b] bg-[length:200%_200%] animate-gradient-x p-6 rounded-lg shadow-lg mx-auto lg:w-[60vw] h-screen  w-full ">
        <div className="flex items-center gap-2 text-[1.7vh] mb-10 lg:hidden  ">
            <FaWallet className="text-yellow-500" />
            <span>Balance: &#8377; {balance.toFixed(2)}</span>
          </div>
          <Users />
        </div>
  
        {balance !== null && (
          <div className="lg:flex items-center gap-2 text-3xl mb-10 hidden  ">
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
