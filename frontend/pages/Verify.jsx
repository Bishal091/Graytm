import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Verify = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');
  
      if (token) {
        verifyEmail(token);
      } else {
        toast.error('Invalid verification token');
        navigate('/');
      }
    }, [location, navigate]);
  
    const verifyEmail = async (token) => {
      try {
        const response = await fetch(`https://graytm-wallet.onrender.com/graytm/user/verify-email?token=${token}`);
        const data = await response.json();
  
        if (response.ok) {
          toast.success(data.message);
          navigate('/login');
        } else {
          toast.error(data.message);
          navigate('/');
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        toast.error('Failed to verify email');
        navigate('/');
      }
    };
  
    return (
      <div>
        <h1>Verifying Email...</h1>
      </div>
    );
  };
  

export default Verify
