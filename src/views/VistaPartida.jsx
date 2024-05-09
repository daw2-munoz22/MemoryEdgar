import { useEffect, useState } from "react";
import { supabase } from "../database/supabase.js";
import { useClicks } from "../context/ClicksContext.jsx";

export const VistaPartida = () => {
    const { score } = useClicks();
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
        <div>
            <h1>Partidas Generales</h1>
            <p>Puntuación actual: {score}</p>
            <table className="table mt-4">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Puntuación</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                </tr>
                </thead>
                <tbody>
                {partidas.map((partida) => (
                    <tr key={partida.id}>
                        <td>{partida.id}</td>
                        <td>{partida.usuari}</td>
                        <td>{partida.puntuacion}</td>
                        <td>{partida.data}</td>
                        <td>{partida.hora}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
