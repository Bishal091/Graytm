import React, { useState} from 'react'
import { useAuth } from '../src/store/auth';
import {toast}  from "react-toastify";
import { FaGithub, FaLinkedinIn, FaPhoneAlt, FaTwitter } from 'react-icons/fa';





const Contact = () => {

    const[contact,setContact]= useState({
      username:'',
        email:'',
        message:''
      })


const {user}=useAuth();//this user has all the data of the user
const[userDataClient,setUserDataClient]=useState(true);

if(userDataClient&&user){//so that when page refreshes first time username and email of the logged in user appears in the contact form inputs
  setContact({
    username:user.username,
    email:user.email,
    message:""
  })

  setUserDataClient(false)
}


      const handleChange =(e)=>{
        
        console.log(e);
        let name= e.target.name;
        let value = e.target.value;

        setContact({
            ...contact,
            [name]:value,
        }
        );
      };

      const handleSubmit = async (e) =>{
        e.preventDefault();
        // alert(contact.message);
        // console.log(contact);//will give all the updated data inputed by user

        try {
          const response = await fetch("http://localhost:8000/auth/form/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
          });
    
          // console.log("response data : ", await response.json()); //Response can only be used once
    
          if (response.ok) {
          //  const res_data = await response.json();
          //  console.log(res_data)
          //  1st method: directly putting the token inside the local storage, but will be good if we do that using a function
          // localStorage.setItem("token",res_data.token)
    
    
          // 2nd method as this  will be good if we do that using a function, giveing the token value as a parameter to func
          // storeTokenInLocal(res_data.token);
    
            setUserDataClient(true)
              toast.info("Message sent successfully");
            // console.log(responseData);
          } else {
            console.log("error inside response ", response.statusText);
            

          }
        } catch (error) {
          console.error("Error", error);
        }
      }
  return (
    <>
 <div className="bg-[#343736] h-[90vh] flex items-center justify-center">
  <div className="w-[55vw] mx-auto h-[75vh] bg-neutral-800 rounded-lg shadow-md overflow-hidden">
    <div className="md:flex h-full">
      <div className="md:w-[40%] bg-gradient-to-tr from-green-500 to-[#409DB9] p-8 flex flex-col justify-between">
        <div className="flex items-center justify-center mb-6">
          {/* <FaPhoneAlt className="text-5xl text-white mr-4" /> */}
          <h2 className="text-[4vh] font-bold text-white">Contact Me</h2>
        </div>
        <p className="text-lg text-white mb-8">
          I'd love to hear from you! Please fill out the form, I'll be glad with your comments.
        </p>
        <div className="flex items-center justify-center">
          <a
            href="https://github.com/Bishal091"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4 text-white hover:text-gray-300 transition-colors duration-300"
          >
            <FaGithub className="text-[4vh]" />
          </a>
          <a
            href="https://twitter.com/Bishal234113"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4 text-white hover:text-gray-300 transition-colors duration-300"
          >
            <FaTwitter className="text-[4vh]" />
          </a>
          <a
            href="https://www.linkedin.com/in/bishal-singh-797129203/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors duration-300"
          >
            <FaLinkedinIn className="text-[4vh]" />
          </a>
        </div>
      </div>
      <div className="md:w-full h-full p-8  overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-white font-bold mb-2">
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
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white font-bold mb-2">
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
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-white font-bold mb-2">
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
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-green-500 h-32"
            />
          </div>
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="bg-[#409DB9] text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 w-full font-bold"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Contact