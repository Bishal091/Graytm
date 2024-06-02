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
  const [amount, setAmount] = useState("");

  const handleChange = (e) => {
    let inputValue = e.target.value;

    // Remove any existing rupee sign and non-numeric characters
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Update the state with the cleaned value
    setAmount(numericValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:8000/graytm/account/transfer",
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
    }
  };

  return (
    <div className="flex justify-center h-[90vh] bg-neutral-800">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-[65vh] text-card-foreground p-4 space-y-8 w-[30vw] bg-[#409DB9] shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6 bg-[#292D2A] tracking-[0.5vw] rounded">
            <h2 className="text-[5vh] font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6 flex flex-col gap-[5.5vh]">
            <div className="flex items-center justify-center space-x-4">
              <h1 className="text-[4vh]">To-</h1>
              <div className="flex items-center gap-[0.2vw]">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-[4vh] text-white">{name[0].toUpperCase()}</span>
                </div>
                <h3 className="text-[4vh] bg-slate-400 px-3 rounded-md font-semibold">{name}</h3>
              </div>
            </div>
            <div className="space-y-4 h-[30vh] flex flex-col justify-between">
              <div className="space-y-2">
                <label
                  className="text-[3.8vh] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  onChange={handleChange}
                  value={amount ? `₹ ${amount}` : ''}
                  type="text"
                  className="flex h-[6.4vh] w-full rounded-md border border-input bg-gray-200 text-[#343736] px-3 text-[2.7vh]"
                  id="amount"
                  placeholder="Enter amount"
                  min={0}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="justify-center mx-auto rounded-md text-[2vh] font-medium ring-offset-background transition-colors h-[7vh] px-4 py-2 w-[50%] bg-green-500 text-white"
              >
                Initiate Transfer {amount && (
                  <>of
                    <span className="block"> ₹ {amount} </span>
                  </>)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
