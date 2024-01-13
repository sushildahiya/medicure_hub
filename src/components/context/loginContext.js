import { createContext, useContext, useState,useEffect} from "react";

export const loginContext = createContext();

// debug the below custom hook
export const useLoginValue = () => {
  const value = useContext(loginContext);
  return value;
};

// debug the below context Provider
export const LoginContextProvider = ({children}) => {
  const [login, setLogin] = useState(() => localStorage.getItem("user"));
  useEffect(() => {
    const updateLoginFromStorage = () => {
      setLogin(localStorage.getItem("user"));
    };

    // Attach an event listener for storage changes
    window.addEventListener("storage", updateLoginFromStorage);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("storage", updateLoginFromStorage);
    };
  }, []);
  return (
    <loginContext.Provider
      value={{ login, setLogin}}
    >
      {children}
    </loginContext.Provider>
  );
};

