

//import { arrayPersonajes } from '../bd/arrayPersonajes';
import Tarjeta from './Tarjeta'; // Importa el component Tarjeta

function GrupoTarjetas({ datos, onGeneralClick }) {
  return (
    <div className="flex mx-auto flex-wrap bg-slate-700 gap-2 p-5">
      {datos.map((item, index ) => (
        <Tarjeta key={index} nombre={item.nombre} imagen={item.imagen}  onGeneralClick={onGeneralClick}/>
      ))}
    </div>
  );
}

export default GrupoTarjetas;
