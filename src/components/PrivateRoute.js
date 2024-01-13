import { Navigate } from "react-router-dom";
import { useLoginValue } from "./context/loginContext";

const PrivateRoute = ({ Component }) => {
 
const {login,setLogin}=useLoginValue()

 
  return login ? Component : <Navigate to="/login" />;
};
export default PrivateRoute;