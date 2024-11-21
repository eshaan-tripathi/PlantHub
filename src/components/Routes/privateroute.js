import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate } from "react-router-dom";
import axios from 'axios';
import Spinner from "../spinner";
const API = process.env.REACT_APP_API;

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`${API}/api/v1/auth/user-auth`);
        setOk(res.data.ok);
      } catch (err) {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  if (!ok) return <Spinner />; // Show spinner while checking auth
  return ok ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
