import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../lib/appwrite/api";

export const InitialUser = {
  id: "",
  name: "",
  username: "",
  imageUrl: "",
  bio: "",
};

const InitialState = {
  user: InitialUser,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => {},
};

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(InitialUser);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser((prevUser) => ({
          ...prevUser,
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        }));

        setIsAuthenticated(true);

        return true;
      }

      return false;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate("/sign-in");
    }

    const fetchData = async () => {
      const isAuthenticated = await checkAuthUser();
      if (!isAuthenticated) {
        navigate("/sign-in");
      }
    };

    fetchData();
  }, []);

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
