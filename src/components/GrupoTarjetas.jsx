import Tarjeta from './Tarjeta'; // Importa el component Tarjeta

function GrupoTarjetas({ datos, onGeneralClick }) {
  return (
    <div className="flex mx-auto flex-wrap bg-slate-700 gap-2 p-5">
      {datos.map((item, index ) => (
        <Tarjeta key={index} id={index} nombre={item.nombre} imagen={item.imagen} onGeneralClick={onGeneralClick} data={datos} />
      ))}
    </div>
  );
}

export default GrupoTarjetas;

 // No se debe usar 'key' como una prop dentro del componente; es para uso interno de React