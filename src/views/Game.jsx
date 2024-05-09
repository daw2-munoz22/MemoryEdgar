import { useEffect, useState } from "react";
import GrupoTarjetas from "../components/GrupoTarjetas";
import { useClicks } from "../context/ClicksContext";
import Loader from '../components/Loader';
import Swal from 'sweetalert2';
import {useUser} from "../context/UserContext.jsx";
import { musicPlayer, FarandulaMusicCollection } from "../manager/music/musicManager.js";
import {supabase} from "../database/supabase.js"; //
// añadir música al juego


const Game = () => {

  const { totalClicks, incrementTotalClicks, score } = useClicks();
  const [pokemonAleatorios, setPokemonAleatorios] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);  // Temporizador inicializado en 20 segundos
  const [isLoading, setLoading] = useState(true);
  const { user } = useUser();
  let songDictionary = new FarandulaMusicCollection(); //instanciamos la colección de música

  async function SaveGame() {
    // Suponiendo que tienes los datos de la partida disponibles
    // Por ejemplo, podrían venir de una interfaz de usuario o ser generados durante el juego

    // Llama a la función InsertPartida y espera a que se complete la inserción
    try {

      const { data: { user } } = await supabase.auth.getUser()
      const { data: usu, error: errorUsu } = await supabase
          .from('partidas')
          .insert([
            {
              usuari: user.id,
              data: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
              hora: new Date().toISOString().split('T')[1].split('.')[0], // Hora actual en formato HH:MM:SS
              puntuacion: score,
            }
          ])
          .select()

      if(errorUsu) throw new Error (errorUsu.message)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const requests = Array.from({ length: 9 }, () => {
          const random = Math.floor(Math.random() * 1000);
          return fetch(`https://pokeapi.co/api/v2/pokemon/${random}`)
              .then(response => {
                if (!response.ok) {
                  throw new Error("Failed to fetch data");
                }
                return response.json();
              })
              .then(data => ({
                id: data.id,
                nombre: data.name,
                imagen: data.sprites.other["official-artwork"].front_default,
              }));
        });

        const pokemons = await Promise.all(requests); //realizar todas las peticiones y resolver todas asincrónicamente

        songDictionary.addSong("mus_thequeenofdunes", "the-queen-of-dunes-169012.mp3", 56, 107);
        songDictionary.addSong("mus_summer-adventures", "summer-adventures-115949.mp3", 56, 107);
        songDictionary.addSong("sfx_accept", "beep696243.mp3", 56, 107);
        songDictionary.addSong("sfx_cancel", "systemnotification4206493.mp3", 56, 107);



        const duplicadoPokemons = [...pokemons, ...pokemons]; //duplicamos los pokemons obtenidos
        const pokemonsAleatorios = duplicadoPokemons.sort(() => Math.random() - 0.5); //los desordenamos y los colocamos en posiciones aleatorias

        setPokemonAleatorios(pokemonsAleatorios);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);

        //una vez finalizada el proceso de espera para descargar los pokemons, iniciamos la musica del juego
        const song1 = songDictionary.getSong("mus_thequeenofdunes");
        musicPlayer.swapSong(song1.audioUrl, song1.loopStartTime, song1.loopEndTime);

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
             SaveGame();
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
