import React, { useState, useEffect } from 'react';
import { useAuth } from '../src/store/auth';
import { toast } from 'react-toastify';
import { FaGithub, FaLinkedinIn, FaPhoneAlt, FaTwitter } from 'react-icons/fa';

// Import CSS for react-toastify
import 'react-toastify/dist/ReactToastify.css';

// Initialize Toastify


const Contact = () => {
  const [contact, setContact] = useState({
    username: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // This user has all the data of the user
  const [userDataClient, setUserDataClient] = useState(true);

  useEffect(() => {
    // Fetch user data only once on component mount
    if (userDataClient && user) {
      setContact({
        username: user.username,
        email: user.email,
        message: ""
      });

      setUserDataClient(false);
    }
  }, [user, userDataClient]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://graytm-wallet.onrender.com/graytm/contact/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      const data = await response.json(); // Get the response data

      if (response.ok) {
        toast.success(data.msg || 'Message sent successfully!');
        setContact({
          username: user.username,
          email: user.email,
          message: ""
        });
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error("Error:", error);
    }finally {
      setLoading(false);
    }
  };

  return (
    <>
  <div className="bg-gradient-to-br from-gray-600 to-gray-800 bg-[length:200%_200%] animate-gradient-x min-h-screen flex items-start lg:items-center justify-center p-4 sm:p-6 md:p-8 mt-[5vh] lg:mt-0">
  <div className="w-full lg:max-w-6xl max-w-[90vw] mx-auto bg-neutral-800 rounded-2xl h-auto shadow-2xl overflow-hidden">
    <div className="flex flex-col lg:flex-row h-full">
      <div className="lg:w-2/5 bg-gradient-to-r from-green-500 to-[#409DB9] bg-[length:200%_200%] animate-gradient-x p-6 sm:p-8 flex flex-col justify-between">
        <div className="text-center lg:text-left">
          <h2 className="text-[4vh] sm:text-[4vh]  text-white mb-4">Contact Me</h2>
          <p className="text-[2vh] sm:text-[2.2vh] text-white mb-8 italic">
            I'd love to hear from you! Please fill out the form, and I'll be glad to receive your comments.
          </p>
        </div>
        <div className="flex items-center justify-center lg:justify-start space-x-6">
          <a
            href="https://github.com/Bishal091/Graytm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors duration-300"
          >
            <FaGithub className="text-[3vh] sm:text-[4vh]" />
          </a>
          <a
            href="https://twitter.com/Bishal234113"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors duration-300"
          >
            <FaTwitter className="text-[3vh] sm:text-[4vh]" />
          </a>
          <a
            href="https://www.linkedin.com/in/bishal-singh-797129203/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors duration-300"
          >
            <FaLinkedinIn className="text-[3vh] sm:text-[4vh]" />
          </a>
        </div>
      </div>
      <div className="lg:w-3/5 p-6 sm:p-8 ">
        <form onSubmit={handleSubmit} className="space-y-6 items-stretch flex flex-col">
          <div>
            <label htmlFor="username" className="block text-white  mb-2 lg:text-[1.8vh] text-[2.5vh]">
              Username
            </label>
            <input
              type="text"
              placeholder="Your username"
              id="username"
              name="username"
              required
              autoComplete="off"
              onChange={handleChange}
              value={contact.username}
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 lg:text-[1.8vh] text-[2.5vh]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white  mb-2 lg:text-[1.8vh] text-[2.5vh]">
              E-Mail
            </label>
            <input
              type="email"
              placeholder="Your email"
              id="email"
              name="email"
              required
              autoComplete="off"
              onChange={handleChange}
              value={contact.email}
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 lg:text-[1.8vh] text-[2.5vh]"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-white  mb-2 lg:text-[1.8vh] text-[2.5vh]">
              Message
            </label>
            <textarea
              placeholder="Your message"
              autoComplete="off"
              id="message"
              name="message"
              required
              onChange={handleChange}
              value={contact.message}
              className="w-full px-4 py-3 h-[20vh]  rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500  lg:text-[1.8vh] text-[2.5vh]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-[#409DB9] text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-[#3A8DA5] transition-all duration-300  text-[2.2vh]"
          >
           {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Sending Message...</span>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  ) : (
                    ' Send Message'
                  )}
           
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default Contact;
