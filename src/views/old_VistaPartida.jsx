import {useEffect, useState} from "react";
import {Partidas} from "../database/model/partida.js";

export const Old_VistaPartida = () => {
    const [partidas, setPartidas] = useState([]);

    useEffect(() => {
        const fetchPartidas = async () => {
            try {
                const fetchedPartidas = await Partidas.getAll();
                setPartidas(fetchedPartidas);
            } catch (error) {
                console.error('Error fetching partidas:', error);
            }
        };

        fetchPartidas();
    }, []);

    return (
        <>
            <h1>Partidas Generales</h1>
            <h2 className="mt-5">Partidas</h2>
            <table className="table mt-4">
                <thead>
                <tr>
                    <th>Código</th>
                    <th>Created</th>
                    <th>Usuario_id</th>
                    <th>Puntos</th>
                    <th>Tiempo</th>
                </tr>
                </thead>
                <tbody>
                {partidas.map(partida => (
                    <tr key={partida.id}>
                        <td>{partida.id}</td>
                        <td>{partida.created_at}</td>
                        <td>{partida.usuari}</td>
                        <td>{partida.puntuacion}</td>
                        <td>{partida.tiempo}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}