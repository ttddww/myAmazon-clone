import React, { useContext, useEffect } from "react";
import { DataContext } from "../../DataProvider/DataProvider";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, msg, redirect }) => {
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } }); // redirect to login page
    }
  }, [user]);

  return children;
};

export default ProtectedRoute;
