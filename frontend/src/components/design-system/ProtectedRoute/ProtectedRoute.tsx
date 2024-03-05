import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import { RootState } from "../../../redux/store";


const ProtectedRoute = () => {
  const {userInfo} = useSelector((state: RootState) => state.auth)

  return (
    userInfo ? <Outlet /> : <Navigate to={ROUTES.sign.in} />
  )
}

export default ProtectedRoute
