import React, { createContext, useReducer, useEffect } from "react";
import { AuthReducer, AuthState, AuthAction } from "./AuthReduce";
import jwtDecode from "jwt-decode";

const initialState: AuthState = {
  user: null,
  token: null,
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

type DecodedToken = {
  iat: number;
  userEmail: string;
  userID: string;
  userName: string;
  exp: number;
};

const AuthProvider = (props: AuthProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        dispatch({
          type: "LOGOUT",
        });
      } else {
        dispatch({
          type: "LOGIN",
          payload: {
            user: {
              iat: decodedToken.iat,
              userEmail: decodedToken.userEmail,
              userID: decodedToken.userID,
              userName: decodedToken.userName,
              exp: decodedToken.exp,
            },
            token: token,
          },
        });
      }
    }
  }, [dispatch]);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
