import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../views/Home';
import Game from '../views/Game';
import About from '../views/About';

const Header = () => {
  return (
    <Router>
      <div>
      <header className="bg-blue-50 py-4">
          <div className="container mx-auto items-center">
            <nav>
              <ul className="flex justify-center">
                <li>
                  <Link to="/" className="border p-2 shadow-lg bg-yellow-800 text-white hover:scale-105 hover:shadow-xl cursor-pointer">Home</Link>
                </li>
                <li>
                  <Link to="/pokemonMemory" className="border p-2 shadow-lg bg-yellow-800 text-white hover:scale-105 hover:shadow-xl cursor-pointer">Pokemon Memory</Link>
                </li>
                <li>
                  <Link to="/marvelMemory" className="border p-2 shadow-lg bg-yellow-800 text-white hover:scale-105 hover:shadow-xl cursor-pointer">Marvel Memory</Link>
                </li>
                <li>
                  <Link to="/about" className="border p-2 shadow-lg bg-yellow-800 text-white hover:scale-105 hover:shadow-xl cursor-pointer">Acerca de</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
      
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/pokemonMemory' element={<Game />}/>
        <Route path='/marvelMemory' element={<Game />}/>
        <Route path='/about' element={<About />}/>
      </Routes>
    </Router>
    
  )
}

export default Header