import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export function UserContextProvider(children) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  
  async function verSiHaySesionLogeado(){

    try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if(user){
            setIsLoggedIn(true)
            navigate('/pokemonMemory')
        }

    } catch (error) {
        console.log(error)
    }
    
}

  const [usuario, setUsuario] = useState({
    nombre: 'default',
    apellido: 'default',
    email: 'default',
    password: ''
})


  return(
    <UserContext.Provider value={{
        usuario, setUsuario,
        isLoggedIn, setIsLoggedIn,
        verSiHaySesionLogeado,
    }}>
        {children}
    </UserContext.Provider>
  )
}
