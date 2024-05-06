import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(false);  // Inicializa el estado del usuario como null

    const login = (userData) => {
        setUser(userData);  // Función para iniciar sesión y establecer datos del usuario
    };

    const logout = () => {
        setUser(false);  // Función para cerrar sesión
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
