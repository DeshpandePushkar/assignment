import { Navigate, Outlet } from "react-router-dom";

const Authorization = ({ allowedRoles }) => {
  let user = JSON.parse(localStorage.getItem("user"));
  let userRole = user ? user.role : null;
  let isAllowed = false;
  if (userRole) {
    isAllowed = allowedRoles.find((role) => role === userRole);
  }
  return isAllowed ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default Authorization;
