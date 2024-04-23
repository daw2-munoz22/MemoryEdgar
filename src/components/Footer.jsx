const Footer = () => {
  return (
    <div className="w-full mt-24 bg-yellow-600 text-gray-200 py-2 px-2">
      {/*Contenedor Principal*/}
      <div className="max-w-[14400px] mx-auto grid grid-cols-2 md:grid-cols-6 py-8 px-4">
        {/*Fases del Memory*/}
        <div>
          <h6 className="font-bold uppercase pt-2 transition-transform duration-500 hover:scale-105 cursor-pointer mb-4">
            Fases del Memory
          </h6>
          <ul>
            <li className="py-1 transition-transform duration-500 hover:scale-105 cursor-pointer mb-4">
              <a href="https://nodejs.org/en">
                INSTALAR <strong>NODE.JS</strong>
              </a>
            </li>
            <li className="py-1 transition-transform duration-500 hover:scale-105 cursor-pointer mb-4">
              Vite + TAILWIND
            </li>
            <li className="py-1 transition-transform duration-500 hover:scale-105 cursor-pointer mb-4">
              <a href="https://tailwindcss.com/docs/guides/vite">
                CONFIGURACIÓN DE TAILWIND
              </a>
            </li>
            <li className="py-1 transition-transform duration-500 hover:scale-105 cursor-pointer">
              COMPONENTES, VISTAS Y CONTEXTO
            </li>
            <li className="py-1 transition-transform duration-500 hover:scale-105 cursor-pointer">
              API REST <strong><a href="https://pokeapi.co/">POKEAPI</a></strong> + LOGICA
            </li>
            <li className="py-1 transition-transform duration-500 hover:scale-105 cursor-pointer">
              ALMACENAR DATOS EN BASE DE DATOS
            </li>
          </ul>
        </div>
        {/*Extra*/}
        <div className="col-span-2 py-8 md:pt-2">
          <h6 className="font-bold uppercase pt-2 transition-transform duration-500 hover:scale-105 cursor-pointer mb-4">
            extra
          </h6>
          <p className="uppercase transition-transform duration-500font-bold uppercase transition-transform duration-500 hover:scale-105 cursor-pointer mb-4">
            IMPLEMENTAR MÚSICA Y EFECTOS ESPECIALES
          </p>
        </div>
        {/*Legalidad*/}
        <div>
          <h6 className="font-bold uppercase pt-2 transition-transform duration-500 hover:scale-105 cursor-pointer">
            Agradecimientos
          </h6>
          <ul>
            <li className="py-1 transition-transform duration-500 hover:scale-105 cursor-pointer">
              TAILDWIND
            </li>
            <li className="py-1 transition-transform duration-500 hover:scale-105 cursor-pointer">
              REACT
            </li>
            <li className="py-1 transition-transform duration-500 hover:scale-105 cursor-pointer">
              JAVASCRIPT
            </li>
            <li className="py-1 transition-transform duration-500 hover:scale-105 cursor-pointer">
              POKEAPI
            </li>
          </ul>
        </div>
        {/*Firma*/}
        <div className="col-span-2 py-8 md:pt-2">
          <h6 className="font-bold uppercase pt-2 transition-transform duration-500 hover:scale-105 cursor-pointer mb-4">
            autor
          </h6>
          <p className="uppercase transition-transform duration-500font-bold uppercase transition-transform duration-500 hover:scale-105 cursor-pointer mb-4">
            Nombre: Edgar Muñoz Manjón
          </p>
          <p className="uppercase transition-transform duration-500font-bold uppercase transition-transform duration-500 hover:scale-105 cursor-pointer mb-4">
            Curso: Desarrollo de Aplicaciones Web 2º curso
          </p>
          <p className="uppercase transition-transform duration-500font-bold uppercase transition-transform duration-500 hover:scale-105 cursor-pointer mb-4">
            Año de promoción: 2023 - 2024
          </p>
          <p className="uppercase transition-transform duration-500font-bold uppercase transition-transform duration-500 hover:scale-105 cursor-pointer mb-4">
            Fecha de realización : 01 de Abril de 2024
          </p>
          <p className="uppercase transition-transform duration-500font-bold uppercase transition-transform duration-500 hover:scale-105 cursor-pointer mb-4">
            Fecha de finalización : 12 de Mayo de 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
