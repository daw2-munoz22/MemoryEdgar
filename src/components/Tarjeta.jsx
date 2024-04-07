import { useState } from "react"



function Tarjeta({nombre, imagen, onGeneralClick}){
    const [contador, setContador] = useState(0); // Estat local per al contador de clics
    const handleClick = () => {
        setContador(contador + 1); // Incrementa el contador de clics en 1
        onGeneralClick();
    };
    return(
        <>
        <div className="bg-slate-200 rounded  w-[150px] h-[220px] border p-2 shadow-lg text-center" onClick={handleClick}>
            <p>Clics: {contador}</p>
            <img className="h-[150px]" src={imagen} alt={nombre} />
            <h2 className="pt-1">{nombre}</h2>
        </div>
        </>  
    )
}

export default Tarjeta
