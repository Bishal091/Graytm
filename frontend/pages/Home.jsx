import React, { useEffect, useState } from "react";
import { useAuth } from "../src/store/auth";
import {
  FaMoneyBillWave,
  FaExchangeAlt,
  FaPhoneAlt,
  FaCoins,
  FaMoneyBill,
  FaRupeeSign,
  FaHandHolding,
  FaHandHoldingUsd,
  FaRegFile,
  FaBriefcase,
  FaUser,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiReact,
  SiJavascript,
  SiMongodb,
  SiRedux,
  SiExpress,
  SiAxios,
  SiReactrouter,
  SiIcon,
} from "react-icons/si";
import { useNavigate } from "react-router-dom";
import Send from "./Transfer";

const Home = () => {
  const navigate = useNavigate();
  const { user, balance, getBalance, getTransactions, accountId } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 6;
  const [error, setError] = useState(null);

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (user) {
      getBalance();
    }
  }, [user, getBalance]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (user) {
          const data = await getTransactions(accountId);
          //console.log(data);

          if (Array.isArray(data)) {
            //console.log("d");
            setTransactions(data);
            //console.log("c");
          } else {
            //console.log("zz");
            throw new Error("Expected an array of transactions");
          }
        } else {
          //console.log("aaaaaaaaaaaaa");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError(error.message);
      }
    };

    fetchTransactions();
  }, [accountId]);
  const navigatess = () => {
    if (user) {
      navigate("/graytm/transfer");
    } else {
      navigate("/graytm/register");
    }
  };
  const navigatesR = () => {
    navigate("/graytm/register");
  };
  const navigatesC = () => {
    navigate("/graytm/contact");
  };

  return (
    <>
    <div className="bg-gray-100 min-h-screen">
  <main className="container mx-auto py-[2vh] px-[2vw] lg:px-[4vw]">
    <div className="flex flex-col-reverse lg:flex-row-reverse gap-[3vh]">
      {/* Welcome Section */}
      <section className="bg-white shadow-md rounded-lg p-[2vh] lg:p-[3vh] lg:w-[40vw] w-full hidden lg:block">
        <h2 className="text-[2.5vh] lg:text-[3vh] font-semibold text-gray-800 mb-[1vh]">
          <p className="text-[3vh] lg:text-[3.5vh]">
            {user ? `Hi, ${user.username}` : "WALLET OVERVIEW"}
          </p>
        </h2>
        <p className="text-gray-600 text-[2vh] lg:text-[2.3vh]">
          {user
            ? `Here's an overview of your wallet:`
            : "Register & Login to get the overview of your Wallet."}
        </p>
        {/* Wallet Balance */}
        <div className="bg-green-100 rounded-lg p-[2vh] mt-[2vh]">
          <h3 className="text-[2.2vh] font-bold text-green-800">
            Wallet Balance
          </h3>
          <p className="text-[3vh] font-bold text-green-800 animate-pulse">
            {user ? (
              <>&#8377; {Math.round(balance * 100) / 100}</>
            ) : (
              "*Your Balance"
            )}
          </p>
        </div>

        {/* Past Transactions Section */}
        <section className="mt-[3vh] ">
          <h2 className="text-[3vh] font-semibold text-gray-800 mb-[2vh]">
            Past Transactions
          </h2>
          {user && currentTransactions.length > 0 ? (
            <ul className="gap-[1.6vh] flex flex-col-reverse">
              {currentTransactions.map((transaction) => (
                <li
                  key={transaction._id}
                  className={`p-[2vh] rounded-lg shadow-md ${
                    transaction.from.userId.username === user.username
                      ? "bg-[#ff746b]"
                      : transaction.to.userId.username === user.username
                      ? "bg-[#7fff9e]"
                      : ""
                  }`}
                >
                  {transaction.from.userId.username === user.username ? (
                    <>
                      <span className="text-[#000000] text-[2.2vh] font-bold">
                        <span className="text-black font-normal">Sent to</span>{" "}
                        {transaction.to.userId.username}
                      </span>
                      <span className="float-right text-[2.5vh]">
                        - &#8377;{transaction.amount}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-[#000000] text-[2.2vh] font-bold">
                        <span className="text-black font-normal">Sent from</span>{" "}
                        {transaction.from.userId.username}
                      </span>
                      <span className="float-right text-[2.5vh]">
                        + &#8377;{transaction.amount}
                      </span>
                    </>
                  )}
                  <div className="text-[1.8vh] text-[#2B7A78]">
                    {new Date(transaction.date).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[#000000] text-[2vh]">
              {user ? (
                `Make your first transaction & they will remain here.`
              ) : (
                <>
                  <p className="italic">
                    If there is No Account, then there is No Money, and if there is No Money then there will be No Transactions.
                  </p>
                  <br />
                  <div className="flex gap-[2vh] justify-between">
                    <button
                      onClick={navigatesR}
                      className="hover:bg-[#000000] hover:text-black p-[1.5vh] rounded-lg bg-gradient-to-tr from-green-500 to-[#409DB9] flex text-center justify-center items-center text-[2vh]"
                    >
                      Register
                      <FaUser className="ml-[1vw]" />
                    </button>
                    <button
                      onClick={navigatesC}
                      className="hover:bg-[#000000] hover:text-black p-[1.5vh] rounded-lg bg-gradient-to-tr from-green-500 to-[#409DB9] flex text-center justify-center items-center text-[2vh]"
                    >
                      Contact Us
                      <FaUser className="ml-[1vw]" />
                    </button>
                  </div>
                </>
              )}
            </p>
          )}

          {/* Pagination */}
          {transactions.length > transactionsPerPage && (
            <div className="flex justify-center mt-[2vh]">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-[2vw] py-[1vh] bg-gray-300 text-gray-800 rounded-l-md text-[2vh] ${
                  currentPage === 1
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Prev
              </button>
              {Array.from(
                { length: Math.ceil(transactions.length / transactionsPerPage) },
                (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`px-[2vw] py-[1vh] text-[2vh] ${
                      currentPage === index + 1
                        ? "bg-gray-800 text-white"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(transactions.length / transactionsPerPage)
                }
                className={`px-[2vw] py-[1vh] bg-gray-300 text-gray-800 rounded-r-md text-[2vh] ${
                  currentPage ===
                  Math.ceil(transactions.length / transactionsPerPage)
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </section>

      <section className="flex flex-col lg:w-[55vw] w-full">
        <section className="bg-white shadow-md rounded-lg p-[3vh] mb-[3vh]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-[1vw]">
            <div className="md:w-1/2 mb-[2vh] md:mb-0">
              <h2 className="text-[3vh] font-ubuntu text-[#343736] mb-[2vh] font-bold flex items-center gap-[1vw]">
                Welcome to Graytm Wallet <FaHandHoldingUsd />
              </h2>
              <p className="text-[2vh] text-[#343736] mb-[2vh]">
                Graytm is a secure and convenient digital wallet that allows you to transfer money. 
                The Money provided to you is Random. You can send this money to anyone connected 
                to the platform <b>Graytm</b>.
              </p>
              <button
                onClick={navigatess}
                className="bg-green-500 text-white py-[1vh] px-[2vw] text-[2.5vh] rounded-md shadow-md hover:bg-green-600 transition-colors duration-300 flex items-center"
              >
                <FaMoneyBillWave className="mr-[1vw]" />
                Get Started
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center  rounded-md overflow-hidden">
  <img 
    src="wallet.png" 
    alt="Wallet" 
    className="lg:size-80 animate-slowZoom sm:size-9/12 size-0 "
  />
</div>
          </div>
        </section>

        <section className="bg-white shadow-md rounded-lg p-[2vh] lg:p-[3vh] lg:w-[40vw] w-full lg:hidden">
        <h2 className="text-[2.5vh] lg:text-[3vh] font-semibold text-gray-800 mb-[1vh]">
          <p className="text-[3vh] lg:text-[3.5vh]">
            {user ? `Hi, ${user.username}` : "WALLET OVERVIEW"}
          </p>
        </h2>
        <p className="text-gray-600 text-[2vh] lg:text-[2.3vh]">
          {user
            ? `Here's an overview of your wallet:`
            : "Register & Login to get the overview of your Wallet."}
        </p>
        {/* Wallet Balance */}
        <div className="bg-green-100 rounded-lg p-[2vh] mt-[2vh]">
          <h3 className="text-[2.2vh] font-bold text-green-800">
            Wallet Balance
          </h3>
          <p className="text-[3vh] font-bold text-green-800 animate-pulse">
            {user ? (
              <>&#8377; {Math.round(balance * 100) / 100}</>
            ) : (
              "*Your Balance"
            )}
          </p>
        </div>

        {/* Past Transactions Section */}
        <section className="mt-[3vh] ">
          <h2 className="text-[3vh] font-semibold text-gray-800 mb-[2vh]">
            Past Transactions
          </h2>
          {user && currentTransactions.length > 0 ? (
            <ul className="gap-[1.6vh] flex flex-col-reverse">
              {currentTransactions.map((transaction) => (
                <li
                  key={transaction._id}
                  className={`p-[2vh] rounded-lg shadow-md ${
                    transaction.from.userId.username === user.username
                      ? "bg-[#ff746b]"
                      : transaction.to.userId.username === user.username
                      ? "bg-[#7fff9e]"
                      : ""
                  }`}
                >
                  {transaction.from.userId.username === user.username ? (
                    <>
                      <span className="text-[#000000] text-[2.2vh] font-bold">
                        <span className="text-black font-normal">Sent to</span>{" "}
                        {transaction.to.userId.username}
                      </span>
                      <span className="float-right text-[2.5vh]">
                        - &#8377;{transaction.amount}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-[#000000] text-[2.2vh] font-bold">
                        <span className="text-black font-normal">Sent from</span>{" "}
                        {transaction.from.userId.username}
                      </span>
                      <span className="float-right text-[2.5vh]">
                        + &#8377;{transaction.amount}
                      </span>
                    </>
                  )}
                  <div className="text-[1.8vh] text-[#2B7A78]">
                    {new Date(transaction.date).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[#000000] text-[2vh]">
              {user ? (
                `Make your first transaction & they will remain here.`
              ) : (
                <>
                  <p className="italic">
                    If there is No Account, then there is No Money, and if there is No Money then there will be No Transactions.
                  </p>
                  <br />
                  <div className="flex gap-[2vh] justify-between">
                    <button
                      onClick={navigatesR}
                      className="hover:bg-[#000000] hover:text-black p-[1.5vh] rounded-lg bg-gradient-to-tr from-green-500 to-[#409DB9] flex text-center justify-center items-center text-[2vh]"
                    >
                      Register
                      <FaUser className="ml-[1vw]" />
                    </button>
                    <button
                      onClick={navigatesC}
                      className="hover:bg-[#000000] hover:text-black p-[1.5vh] rounded-lg bg-gradient-to-tr from-green-500 to-[#409DB9] flex text-center justify-center items-center text-[2vh]"
                    >
                      Contact Us
                      <FaUser className="ml-[1vw]" />
                    </button>
                  </div>
                </>
              )}
            </p>
          )}

          {/* Pagination */}
          {transactions.length > transactionsPerPage && (
            <div className="flex justify-center mt-[2vh]">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-[2vw] py-[1vh] bg-gray-300 text-gray-800 rounded-l-md text-[2vh] ${
                  currentPage === 1
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Prev
              </button>
              {Array.from(
                { length: Math.ceil(transactions.length / transactionsPerPage) },
                (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`px-[2vw] py-[1vh] text-[2vh] ${
                      currentPage === index + 1
                        ? "bg-gray-800 text-white"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(transactions.length / transactionsPerPage)
                }
                className={`px-[2vw] py-[1vh] bg-gray-300 text-gray-800 rounded-r-md text-[2vh] ${
                  currentPage ===
                  Math.ceil(transactions.length / transactionsPerPage)
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </section>

        {/* Offers and Promotions */}
        <section className="bg-white shadow-md rounded-lg p-[3vh] mb-[3vh]">
          <h2 className="text-[3vh] font-bold text-gray-800 mb-[2vh]">
            Offers & Promotions
          </h2>
          <div className="flex overflow-x-auto space-x-[2vw] pb-[1vh]">
            {/* Offer Cards */}
            <div className="flex-shrink-0 lg:w-64  w-[33%] rounded-lg overflow-hidden bg-gradient-to-r from-green-400 to-[#65d0f0] bg-[length:200%_200%] animate-gradient-x">
              <div className="p-[2vh]">
                <h3 className="text-[2.2vh] font-bold text-[#343736] mb-[1vh]">
                  Flat 20% Off
                </h3>
                <p className="text-[#343736] text-[1.8vh]">
                  Advertisement- On all movie ticket bookings
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 lg:w-64  w-[33%] rounded-lg overflow-hidden bg-gradient-to-r from-green-400 to-[#65d0f0] bg-[length:200%_200%] animate-gradient-x">
              <div className="p-[2vh]">
                <h3 className="text-[2.2vh] font-bold text-[#343736] mb-[1vh]">
                  Flat 30% Off
                </h3>
                <p className="text-[#343736] text-[1.8vh]">
                  Advertisement- On all movie ticket bookings
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 lg:w-64  w-[33%] rounded-lg overflow-hidden bg-gradient-to-r from-green-400 to-[#65d0f0] bg-[length:200%_200%] animate-gradient-x">
              <div className="p-[2vh]">
                <h3 className="text-[2.2vh] font-bold text-[#343736] mb-[1vh]">
                  Flat 40% Off
                </h3>
                <p className="text-[#343736] text-[1.8vh]">
                  Advertisement- On all movie ticket bookings
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="bg-white shadow-md rounded-lg p-[3vh] mb-[3vh]">
          <h2 className="text-[3vh] font-bold text-gray-800 mb-[2vh]">
            Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2vh]">
            <div className="bg-gradient-to-r from-green-400 to-[#65d0f0] bg-[length:200%_200%] animate-gradient-x text-[#343736] p-[2vh] rounded-md">
              <h3 className="text-[2.2vh] font-bold mb-[1vh]">
                Advertisements Here
              </h3>
              <p className="text-[1.8vh]">Easily pay your utility bills</p>
            </div>
          </div>
        </section>

        {/* Technologies Used */}
        <section className="bg-[#343736] p-[3vh] rounded-lg shadow-md">
          <h3 className="text-[3vh] font-bold text-white mb-[2vh]">
            Technologies Used in this Project
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[2vh]">
            <div className="flex flex-col items-center text-center text-white">
              <SiTailwindcss className="text-[4vh] mb-[1vh]" />
              <span className="text-[1.8vh]">Tailwind CSS</span>
            </div>
            <div className="flex flex-col items-center text-center text-white">
              <SiReact className="text-[4vh] mb-[1vh] text-green-500" />
              <span className="text-[1.8vh]">React</span>
            </div>
            <div className="flex flex-col items-center text-center text-white">
              <SiJavascript className="text-[4vh] mb-[1vh] text-yellow-300" />
              <span className="text-[1.8vh]">JavaScript</span>
            </div>
            <div className="flex flex-col items-center text-center text-white">
              <SiMongodb className="text-[4vh] mb-[1vh] text-green-500" />
              <span className="text-[1.8vh]">MongoDB</span>
            </div>
            <div className="flex flex-col items-center text-center text-white">
              <SiExpress className="text-[4vh] mb-[1vh] text-gray-400" />
              <span className="text-[1.8vh]">Express</span>
            </div>
            <div className="flex flex-col items-center text-center text-white">
              <SiRedux className="text-[4vh] mb-[1vh] text-purple-600" />
              <span className="text-[1.8vh]">Redux</span>
            </div>
            <div className="flex flex-col items-center text-center text-white">
              <SiAxios className="text-[4vh] mb-[1vh] text-purple-600" />
              <span className="text-[1.8vh]">Axios</span>
            </div>
            <div className="flex flex-col items-center text-center text-white">
              <SiReactrouter className="text-[4vh] mb-[1vh] text-purple-600" />
              <span className="text-[1.8vh]">React Router</span>
            </div>
          </div>
        </section>
      </section>
    </div>
  </main>
</div>
    </>
  );
};

export default Home;
