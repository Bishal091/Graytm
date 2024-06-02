import React, { useEffect } from 'react'
import { useAuth } from '../src/store/auth';

const About = () => {
  const {user}= useAuth();
  useEffect( ()=>{

  },[user])
  return (
    <div>

<p>Hello,{user.username}</p>
{/* {user ? (
        <p>Hello, {user.username}</p>
      ) : (
        <p>Hi</p>
      )} */}

  </div>
  )
}

export default About