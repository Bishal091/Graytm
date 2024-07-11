import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAuth } from "../src/store/auth";

export const SendMoney = () => {
  const navigate = useNavigate();
  const { tokenval, balance } = useAuth();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let inputValue = e.target.value;

    // Remove any existing rupee sign and non-numeric characters
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Update the state with the cleaned value
    setAmount(numericValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post(
        `https://graytm-wallet.onrender.com/graytm/account/transfer`,
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenval}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(`Transfer Successful of Amount ₹${amount}  to   ${name}`);
        setAmount(null)
        navigate("/graytm");
      } else {
        toast.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message;

        if (status === 400) {
          toast.error(`Transfer Failed: ${message}`);
        } else if (status === 500) {
          toast.error(`Server Error: ${message}`);
        } else {
          toast.error(`Error: ${message}`);
        }
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-[90vh] bg-neutral-800">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-[55vh] text-card-foreground p-4 space-y-8 lg:w-[30vw] w-[90vw] bg-gradient-to-r from-green-500 to-[#409DB9] bg-[length:200%_200%] animate-gradient-x shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 px-6 py-3 bg-[#292D2A] tracking-[0.5vw] rounded">
            <h2 className="text-[3vh] font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6 flex flex-col gap-[4vh]">
            <div className="flex items-center justify-center space-x-4">
              {/* <div className="flex items-center ">
                <div className="w-12 h-12 rounded-full bg-[#2B7A78] flex items-center justify-center">
                  <span className="text-[2vh] text-white">{name[0].toUpperCase()}</span>
                </div>
                <h3 className="text-[2.5vh] capitalize px-3 rounded-md font-semibold font-sans ">{name}</h3>
              </div> */}
              <div className="flex items-center gap-4 mb-3 sm:mb-0 flex-grow justify-center">
              <h1 className="text-[2.5vh] font-thin  text-center">To-</h1>
        <div className="rounded-full lg:w-14 lg:h-14 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 flex-shrink-0 flex justify-center items-center text-white font-bold shadow-md">
          <div className="lg:text-[2.4vh] text-[1.8vh]">
            {name[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center text-gray-900 text-[2.2vh] sm:text-[2.4vh] font-semibold">
          <div className="break-words">
            {name}
          </div>
        </div>
      </div>
            </div>
            <div className="space-y-4 h-[30vh] flex flex-col justify-between">
              <div className="space-y-2">
                <label
                  className="text-[2.8vh] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  onChange={handleChange}
                  value={amount ? `₹ ${amount}` : ''}
                  type="text"
                  className="flex h-[4.4vh] w-full rounded-md border border-input bg-gray-200 text-[#343736] px-3 text-[2.1vh]"
                  id="amount"
                  placeholder="Enter amount"
                  min={0}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="justify-center mx-auto rounded-md text-[2vh] font-medium ring-offset-background transition-colors h-[7vh] px-4 py-2 w-[50%] bg-[#2B7A78] hover:bg-gray-600 text-white"
              >

{loading && amount ? (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Initiating Transfer...</span>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  ) : (
                    <>
                    Initiate Transfer {amount && (
                  <>of
                    <span className="block"> ₹ {amount} </span>
                  </>)}
                  </>
                  )}
              
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
