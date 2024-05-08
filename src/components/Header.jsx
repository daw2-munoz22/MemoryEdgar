import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import Home from '../views/Home';
import Game from '../views/Game';
import About from '../views/About';
import {useUser} from "../context/UserContext.jsx";
import {AppBar} from "./AppBar.jsx";
import {useState} from "react";

//Realizar renderPages para navegar en cada apartado del menu

const menu = [
    { name: 'Home', href: '/', current: true, element: <Home /> },
    { name: 'Pokemon Memory', href: '/pokemonMemory', current: false, element: <Game /> },
    { name: 'Marvel Memory', href: '/marvelMemory', current: false, element: <Game /> },
    { name: 'Acerca de', href: '/about', current: false, element: <About /> },
];

const Header = () => {
    const { user, logout } = useUser(); // Utiliza logout desde el contexto
     const [partida, setPartida] = useState({ user_icon: '/public/default-user.svg' });



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