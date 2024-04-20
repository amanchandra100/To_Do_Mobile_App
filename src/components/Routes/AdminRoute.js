import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
// import { Outlet } from "react-router-dom";
import axios from "axios";
// import Spinner from "../Spinner";

const host = "http://192.168.31.115:8082";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${host}/api/v1/auth/admin-auth`);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? 1 : 0;
}