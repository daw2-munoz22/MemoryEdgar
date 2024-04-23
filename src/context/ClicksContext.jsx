import { createContext, useContext, useState } from 'react';

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

  const incrementTotalClicks = () => {
    setTotalClicks(totalClicks + 1);
  };

  return (
    <ClicksContext.Provider value={{ 
      totalClicks, incrementTotalClicks,
      selectCard, setSelectCard, // contexto para la logica de las cartas
      CurrentCard, setCurrentCard,
      CardA, setCardA,
      CardB, setCardB
      }}>
      {children}
    </ClicksContext.Provider>
  );
}
