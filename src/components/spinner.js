import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => prevValue - 1);
    }, 1000);

    if (count === 0 && navigate('/login',{
        state:location.pathname
    })) {
      
    }

    return () => clearInterval(interval);
  }, [count, navigate,location]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "#f8f9fa", // Optional: Add a subtle background for better visibility
      }}
    >
      <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="mt-3">Redirecting in {count} seconds...</div>
    </div>
  );
};

export default Spinner;
