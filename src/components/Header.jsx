import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import Home from '../views/Home';
import Game from '../views/Game';
import About from '../views/About';
import {useUser} from "../context/UserContext.jsx";
import {AppBar} from "./AppBar.jsx";
import React, {useState} from "react";
import {VistaPartida} from "../views/VistaPartida.jsx";
import {LoginAuth} from "./LoginAuth.jsx";
import {RegisterAuth} from "./RegisterAuth.jsx";

//Realizar renderPages para navegar en cada apartado del menu

const menu = [
    { name: 'Home', href: '/', current: true, visible: true, element: <Home /> },
    { name: 'Pokemon Memory', href: '/pokemonMemory', current: false, visible: true, element: <Game /> },
    { name: 'Marvel Memory', href: '/marvelMemory', current: false, visible: true, element: <Game /> },
    { name: 'Rankings', href: '/rankings', current: false, visible: false, element: <VistaPartida /> },
    { name: 'My Rankings', href: '/my-rankings', current: false, visible: false, element: <VistaPartida /> },
    { name: 'Acerca de', href: '/about', current: false, visible: true, element: <About /> },

    { name: 'LoginAuth', href: '/loginAuth', current: false, visible: false, element: <LoginAuth /> },
    { name: 'RegisterAuth', href: '/registerAuth', current: false, visible: false, element: <RegisterAuth /> },
];

const Header = () => {
    const { user, logout } = useUser(); // Utiliza logout desde el contexto
     const [partida, setPartida] = useState({ user_icon: '/default-user.svg' });



  return (
    <Router>
      <div>
          <header className="bg-blue-50 py-4">
              <AppBar navigation={menu} notifications={false} usercookie={user} loginstate={logout} partida={partida}/>
              {/*<div className="container mx-auto items-center"></div>*/}
          </header>
      </div>

        {/*Instanciamos tantas pantallas como componentes tiene el menu */}
        <Routes>
            {
                menu.map((menu, index) => (
                    <Route key={index} path={menu.href} element={menu.element} />
                ))
            }
        </Routes>

    </Router>
    
  )
}

export default Header