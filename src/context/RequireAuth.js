import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import { useDispatch, useSelector } from "react-redux";

const RequireAuth = ({ allowedRoles }) => {
  const { role } = useSelector((state) => state.app);
  const { auth } = useAuth();
  console.log(auth?.roles);
  const location = useLocation();

  return role?.find((item) => allowedRoles?.includes(item)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
