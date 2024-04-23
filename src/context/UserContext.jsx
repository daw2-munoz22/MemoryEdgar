import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider(children) {
  const [usuario, setUsuario] = useState({
    email: "default",
    password: "",
    imagen:
      "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg",
  });


  return(
    <UserContext.Provider value={{
        usuario, setUsuario
    }}>
        {children}
    </UserContext.Provider>
  )
}
