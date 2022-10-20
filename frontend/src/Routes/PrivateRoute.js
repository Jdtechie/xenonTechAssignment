import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = ({ component }) => {
  const userRow = useSelector((row) => row);
  let auth = userRow.user.isLoggedIn;
  return auth ? component : <Navigate to="/" replace />;
};

export default PrivateRoute;
