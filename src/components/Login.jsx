import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { supabase } from "../database/supabase.js";
import {useUser} from "../context/UserContext.jsx";

export const Login = () => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const { login } = useUser(); // Accede a la función login desde el contexto
    const navigate = useNavigate(); // Initialize the useNavigate hook

    async function loginUser() {
        if (loginUsername && loginPassword) {
            try {

                const { data, error } = await supabase.auth.signInWithPassword({
                    email: loginUsername,
                    password: loginPassword
                });

                if (error) {
                    console.error('Error al iniciar sesión:', error.message);
                    Swal.fire({
                        title: 'Error',
                        text: error.message,
                        icon: 'error'
                    });
                } else {
                    login(data.user)

                    const { logindata, error } = await supabase
                        .from('perfiles')
                        .insert([
                            { id: data.user.id, name: "PACO FIESTAS" },
                        ])
                        .select()

                    Swal.fire('Sessió iniciada amb èxit').then(() => {
                        navigate('/pokemonmemory'); // Use navigate here for redirection
                    });
                }
            } catch (error) {
                console.error('Error al iniciar sesión:', error.message);
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error'
                });
            }


        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Atenció',
                text: 'Si us plau, omple tots els camps.',
            });
        }
    };

    return (
        <>
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-white">Inicia Sessió</h2>
            </div>
            <div className="rounded-md shadow-sm border border-gray-300 p-4">
                <input type="text" placeholder="Email d'usuari" className="form-input mb-4 text-black"
                       value={loginUsername} onChange={e => setLoginUsername(e.target.value)}/>
                <input type="password" placeholder="Contrasenya" className="form-input mb-4 text-black"
                       value={loginPassword} onChange={e => setLoginPassword(e.target.value)}/>
                <button onClick={loginUser}
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Iniciar
                    Sessió
                </button>
            </div>
        </>
    )
}
