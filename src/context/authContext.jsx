import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import userService, {
  createUser,
  getUser,
  loginUser,
  Logout,
} from "../service/userService";

const authContext = createContext(null);
authContext.displayName = "Auth-context";
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const refreshUser = () => setUser(getUser());
  const login = async (credentials) => {
    const response = await loginUser(credentials);
    refreshUser();
    return response;
  };
  const logout = () => {
    Logout();
    refreshUser();
  };
  return (
    <authContext.Provider value={{ user, login, createUser, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
