import { ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../UseContext/UseAuth/UseAuth";

interface RequireAuthProps {
  children: ReactNode;
  redirectTo: string;
}

const RequireAuth = ({ children, redirectTo }: RequireAuthProps) => {
  const { state } = useContext(AuthContext);
  const location = useLocation();
  const isAuthenticated = state.user && state.token;
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} />
  );
};

export default RequireAuth;
