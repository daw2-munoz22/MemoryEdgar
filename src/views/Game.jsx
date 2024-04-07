import { useEffect, useState } from "react";
import GrupoTarjetas from "../components/GrupoTarjetas";
import { useClicks } from "../context/ClicksContext";

const Game = () => {
  const { totalClicks, incrementTotalClicks } = useClicks();
  const [pokemonAleatorios, setPokemonAleatorios] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const pokemons = [];
        for (let i = 0; i < 9; i++) {
          const random = Math.floor(Math.random() * 1000);
          const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon/" + random
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          console.log(data.name);
          pokemons.push({
            id: data.id,
            nombre: data.name,
            imagen: data.sprites.other["official-artwork"].front_default,
          });
        }

        const duplicadoPokemons = [...pokemons, ...pokemons];
        const pokemonsAleatorios = duplicadoPokemons.sort(
          () => Math.random() - 0.5
        );

        setPokemonAleatorios(pokemonsAleatorios);
      } catch (error) {
        console.error(error.message);
      } finally {
        console.log("Petición finalizada");
      }
    }

    fetchData();
  }, []);

  const handleGeneralClick = () => {
    incrementTotalClicks();
  };

  return (
    <div className="h-screen">
      <div className="mx-auto bg-slate-900">
        <h1 className="text-3xl text-center text-white uppercase pt-6">
          Pokemons Memory
        </h1>
        <div className="container mx-auto">
          <button className="text-white bg-gray-800 px-4 py-2 rounded mt-4">
            Clics Generales ({totalClicks})
          </button>
        </div>
        <GrupoTarjetas datos={pokemonAleatorios} onGeneralClick={handleGeneralClick} />
      </div>
    </div>
  );
};

export default Game;
