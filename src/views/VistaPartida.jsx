import { useEffect, useState } from "react";
import { supabase } from "../database/supabase.js";
import { useClicks } from "../context/ClicksContext.jsx";

export const VistaPartida = () => {
    
    const [partidas, setPartidas] = useState([]);

    useEffect(() => {
        loadPartidas(); // Carga las partidas cuando el componente se monta
    }, []);

    async function loadPartidas() {
        try {
            let { data: partidas, error } = await supabase
                .from('partidas')
                .select('*')
                .order('puntuacion', { ascending: false });

            if (error) throw error;

            setPartidas(partidas);
        } catch (error) {
            console.error('Error loading partidas:', error);
        }
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-center my-6">Partidas Generales</h1>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">ID</th>
                        <th scope="col" className="py-3 px-6">Usuario</th>
                        <th scope="col" className="py-3 px-6">Puntuación</th>
                        <th scope="col" className="py-3 px-6">Fecha</th>
                        <th scope="col" className="py-3 px-6">Hora</th>
                    </tr>
                    </thead>
                    <tbody>
                    {partidas.map((partida) => (
                        <tr key={partida.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="py-4 px-6">{partida.id}</td>
                            <td className="py-4 px-6">{partida.usuari}</td>
                            <td className="py-4 px-6">{partida.puntuacion}</td>
                            <td className="py-4 px-6">{partida.data}</td>
                            <td className="py-4 px-6">{partida.hora}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}
