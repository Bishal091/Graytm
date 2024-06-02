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
      <div className="container mx-auto py-10">
        <div className="text-center mb-10">
          {user ? (
            <p className="text-5xl">
              Hello,{" "}
              <span className="text-yellow-500">
                {`${user.username.charAt(0).toUpperCase()}${user.username.slice(1)}`}
              </span>
            </p>
          ) : (
            <p className="text-5xl">Welcome to GRAYTM</p>
          )}
        </div>

        {balance !== null && (
          <div className="flex justify-end items-center gap-2 text-3xl mb-10">
            <FaWallet className="text-yellow-500" />
            <span>Balance: &#8377; {balance.toFixed(2)}</span>
          </div>
        )}

        <div className="w-[80vw] mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
          <Users />
        </div>
      </div>
    </div>
  );
};

export default Transfer;
