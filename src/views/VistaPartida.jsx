import {useEffect, useState} from "react";
import { supabase } from "../database/supabase.js";
import {useUser} from "../context/UserContext.jsx";
import {useClicks} from "../context/ClicksContext.jsx";

export const VistaPartida = () => {

    const [partidas, setPartidas] = useState([]);
    const [profiles, setProfile] = useState([]);
    const {totalClicks} = useClicks();
    const {user} = useUser();

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

    //FUNCION PESADILLA
    async function loadProfiles(id) {
        try {
            const { data, error } = await supabase
                .from('perfiles')
                .select('name')
                .eq('id', id)
                .single();
            return data.name;

            if (error) throw error;
            return id;
        } catch (error) {
            console.error('Error loading partidas:', error);
        }
    }

    async function loadEmail(id) {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('email')
                .eq('id', id)
                .single();

            if (error) throw error;

            return data.email; // Devuelve el email del usuario
        } catch (error) {
            console.error('Error loading email:', error);
            return null; // Retorna null en caso de error
        }
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-center my-6">Partidas Generales</h1>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">Id</th>
                        <th scope="col" className="py-3 px-6">Nom</th>
                        <th scope="col" className="py-3 px-6">Usuario</th>
                        <th scope="col" className="py-3 px-6">Puntuación</th>
                        <th scope="col" className="py-3 px-6">Clicks</th>
                        <th scope="col" className="py-3 px-6">Fecha</th>
                        <th scope="col" className="py-3 px-6">Hora</th>
                    </tr>
                    </thead>
                    <tbody>

                    {partidas.map((partida) => (
                        <tr key={partida.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                            <td className="py-4 px-6">

                                {
                                    partida.id === user.id ? (
                                        <button>Delete</button>
                                    ) : (
                                        <button>No-Delete</button>
                                    )
                                }

                                {partida.id}

                            </td>
                            <td className="py-4 px-6">{partida.usuari}</td>
                            <td className="py-4 px-6">{user.email}</td>
                            <td className="py-4 px-6">{partida.puntuacion}</td>
                            <td className="py-4 px-6">{totalClicks}</td>
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