import { useState, useEffect } from 'react';
import { useClicks } from "../context/ClicksContext";

function Tarjeta({ nombre, imagen }) {
  const [contador, setContador] = useState(0); // Estado para llevar la cuenta de cuántas veces se ha hecho clic en esta tarjeta.
  const [girada, setGirada] = useState(false); // Estado para controlar si la tarjeta está girada (visible) o no.
  const { incrementTotalClicks, CardA, setCardA, CardB, setCardB } = useClicks(); // Obtiene las funciones y estados necesarios del contexto.

  useEffect(() => {
    // Solo actúa si ambas cartas están seleccionadas
    if (CardA && CardB) {
      if (CardA.nombre === CardB.nombre) {
        // Si las cartas coinciden, manténlas visibles y resetea las selecciones
        setTimeout(() => {
          setCardA(null);
          setCardB(null);
        }, 1000); // Tiempo para ver las cartas antes de seguir jugando
      } else {
        // Si las cartas no coinciden, girar ambas hacia atrás
        setTimeout(() => {
          // Si los nombres aún son diferentes (no se han reseteado aún por alguna otra acción)
          if (CardA.nombre !== CardB.nombre) { 
            if (nombre === CardA.nombre || nombre === CardB.nombre) { // Comprueba si esta tarjeta es CardA o CardB, y si es así, gírala hacia atrás.
              setGirada(false);
            }
            setCardA(null);
            setCardB(null);
          }
        }, 1000); // Las cartas se giran hacia atrás después de 1 segundo
      }
    }
  }, [CardA, CardB, setCardA, setCardB, nombre]);

 
  const handleClick = () => {
    if (!girada) {
      incrementTotalClicks();
      setContador(contador + 1);
      setGirada(true);

      if (!CardA) {
        setCardA({ nombre, imagen });
      } else if (!CardB) {
        setCardB({ nombre, imagen });
      }
    }
  };

  return (
    <div className={`bg-slate-200 rounded w-[150px] h-[220px] border p-2 shadow-lg text-center ${girada ? "" : "girando"}`} onClick={handleClick}>
      {girada ? (
        <>
          <p>Clicks: {contador}</p>
          <img className="h-[150px]" src={imagen} alt={nombre} />
          <h2 className="pt-1">{nombre}</h2>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">?</div>
      )}
    </div>
  );
}

export default Tarjeta;
