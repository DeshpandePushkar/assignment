import { Navigate, Outlet } from "react-router-dom";

const Authentication = () => {
  let authToken = localStorage.getItem("authToken");
  return authToken ? <Outlet /> : <Navigate to="/" />;
};

export default Authentication;
