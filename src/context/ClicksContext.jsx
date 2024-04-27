import { createContext, useContext, useEffect, useState } from 'react';

const ClicksContext = createContext();

export function useClicks() {
  return useContext(ClicksContext);
}

export function ClicksProvider({ children }) {
  const [totalClicks, setTotalClicks] = useState(0);
  const [selectCard, setSelectCard] = useState(null);
  let [CardA, setCardA] = useState(null);
  let [CardB, setCardB] = useState(null);
  let [CurrentCard, setCurrentCard] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);  // Temporizador inicializado en 20 segundos

  useEffect(() => {
    // Disminuir el temporizador cada segundo
    let timer = null;
    if (timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 20000);
    }
    return () => clearTimeout(timer);  // Limpieza del temporizador
  }, [timeLeft]);

  const incrementTotalClicks = () => {
    setTotalClicks(totalClicks + 1);
  };

  const incrementScore = () => {
    setScore(score + 1);
  };

  return (
    <ClicksContext.Provider value={{ 
      totalClicks, incrementTotalClicks,
      score, incrementScore,
      timeLeft,
      selectCard, setSelectCard, // contexto para la logica de las cartas
      CurrentCard, setCurrentCard,
      CardA, setCardA,
      CardB, setCardB
      }}>
      {children}
    </ClicksContext.Provider>
  );
}
