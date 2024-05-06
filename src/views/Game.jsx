import { useEffect, useState } from "react";
import GrupoTarjetas from "../components/GrupoTarjetas";
import { useClicks } from "../context/ClicksContext";
import Loader from '../components/Loader';
import Swal from 'sweetalert2';

const Game = () => {

  const { totalClicks, incrementTotalClicks, score } = useClicks();
  const [pokemonAleatorios, setPokemonAleatorios] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);  // Temporizador inicializado en 20 segundos
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function SaveGame(){

    }
    async function fetchData() {
      try {
        const pokemons = [];
        for (let i = 0; i < 9; i++) {
          const random = Math.floor(Math.random() * 1000);
          const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${random}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          pokemons.push({
            id: data.id,
            nombre: data.name,
            imagen: data.sprites.other["official-artwork"].front_default,
          });
        }

        const duplicadoPokemons = [...pokemons, ...pokemons];
        const pokemonsAleatorios = duplicadoPokemons.sort(() => Math.random() - 0.5);

        setPokemonAleatorios(pokemonsAleatorios);
        setLoading(false); // Esto se mueve aquí para indicar que la carga ha terminado después de obtener los datos
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(prevTime => {
        if(prevTime <= 1) {
          clearTimeout(timer);

          Swal.fire({
            title: "Game over",
            text: "Fin del joc!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Aceptar"
          }).then((result) => {
            if (result.isConfirmed) {
              //SaveGame();
              console.log(result);
              //HACER ALGO XD
            }
          });

          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
    return () => clearTimeout(timer);  // Limpieza en caso de que el componente se desmonte antes de que el tiempo acabe
  }, [timeLeft]);

  const handleGeneralClick = () => {
    incrementTotalClicks();
  };

  return (
      <>
        <Loader Opened={isLoading} />
        <div className="h-screen">
          <div className="mx-auto bg-slate-900">
            <h1 className="text-3xl text-center text-white uppercase pt-6">
              Pokemons Memory
            </h1>
            <div className="container mx-auto">
              <button className="text-white bg-gray-800 px-4 py-2 rounded mt-4">
                Clics Generales ({totalClicks})
              </button>
              <button className="text-white bg-gray-800 px-4 py-2 rounded mt-4">Time left: {timeLeft}s</button>
              <button className="text-white bg-gray-800 px-4 py-2 rounded mt-4">Score: {score}</button>
            </div>
            <GrupoTarjetas datos={pokemonAleatorios} onGeneralClick={handleGeneralClick} />
          </div>
        </div>
      </>
  );
};

export default Game;
