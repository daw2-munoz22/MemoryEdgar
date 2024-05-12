import {useEffect, useState} from "react";
import { supabase } from "../database/supabase.js";
import Swal from "sweetalert2";
import { useUser } from "../context/UserContext.jsx"; // Importa el contexto de usuario si lo tienes
import {useNavigate} from "react-router-dom";

export const UserProfile = () => {
    const [userNick, setUserNick] = useState('');
    const { user } = useUser(); // Obtén el usuario autenticado del contexto si lo tienes
    const navigate = useNavigate(); // Initialize the useNavigate hook

//debe ser cuando inicia
    useEffect(() => {
        // Llama a UserprofileByName cuando se monta el componente
        UserprofileByName();
    }, []); // El segundo argumento es un array vacío para que solo se ejecute una vez al montar el componente

    async function UserprofileByName(){
        console.log("DEBUGER");
        try {
            let {data: perfiles, error} = await supabase
                .from('perfiles')
                .select('name')
                .eq('id', user.id); //eq equivale al where
//vale porque es que no sae null ni vascio
            if(perfiles !==null && perfiles.length > 0){
                navigate('/pokemonMemory');
            }
        }catch(e){
            console.log(e.message);
        }
    }

    async function saveProfile() {



        try {
            if (!user) {
                throw new Error("User not authenticated"); // Verifica si el usuario está autenticado
            }

            const { data, error } = await supabase
                .from('perfiles')
                .insert([{ id: user.id, name: userNick }]);

            Swal.fire({
                title: error ? 'Error' : 'Success',
                text: error ? error.message : 'Profile saved successfully',
                icon: error ? 'error' : 'success'
            });

            Swal.fire('Sessió iniciada amb èxit').then(() => {
                navigate('/pokemonMemory'); // Use navigate here for redirection
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <form className="w-full max-w-sm">
                <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        value={userNick}
                        onChange={event => setUserNick(event.target.value)}
                        placeholder="User Nick"
                        aria-label="User Nick"
                    />
                    <button
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="button"
                        onClick={saveProfile}
                    >
                        Save
                    </button>
                    <button
                        className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                        type="button"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </>
    )
}
