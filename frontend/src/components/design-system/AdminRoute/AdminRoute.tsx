import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import { RootState } from "../../../redux/store";

const AdminRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.sign.in} />
  );
};

export default AdminRoute;
