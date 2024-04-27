import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [logged, setLogged] = useState(false);

    const login = () => {
        setLogged(true);
    };

    const logout = () => {
        setLogged(false);
    };
}

  return(
    <UserContext.Provider value={{
        logged, login, logout
    }}>
        {children}
    </UserContext.Provider>
  )

export const autenticarUsuario = () => useContext(UserContext);