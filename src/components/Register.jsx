import {useState} from "react";
import {supabase} from "../database/supabase.js";
import Swal from "sweetalert2";
import SaltManager from "../manager/cryptography/SaltManager.ts";


export const Register = () => {
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');



    async function registerUser() {
        //Authorize
        if (registerUsername && registerEmail && registerPassword  ) {
            try {
                let { data, error } = await supabase.auth.signUp({
                    email: registerEmail,
                    password: registerPassword
                })
                const { data: usu, error: errorUsu } = await supabase
                    .from('perfiles')
                    .insert([
                        {
                            nombre: registerUsername

                        },
                    ])
                    .select()

                //Perfil User
                Swal.fire({
                    title: error.code === 200 ? 'Éxito' : 'Error',
                    text: error.message,
                    icon: error.code === 200 ? 'success' : 'error'
                });

            } catch (error) {
                console.error('Error al registrar el usuario:', error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al registrar el usuario. Por favor, inténtalo de nuevo.',
                });
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Atención',
                text: 'Por favor, completa todos los campos.',
            });
        }
    }

    return (
        <>
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-white">Enregistra't</h2>
            </div>
            <div className="rounded-md shadow-sm border border-gray-300 p-4">
                <input type="text" placeholder="Nom d'usuari" className="form-input mb-4 text-black"
                       value={registerUsername} onChange={e => setRegisterUsername(e.target.value)}/>
                <input type="text" placeholder="Email d'usuari" className="form-input mb-4 text-black"
                       value={registerEmail} onChange={e => setRegisterEmail(e.target.value)}/>
                <input type="password" placeholder="Contrasenya" className="form-input mb-4 text-black"
                       value={registerPassword} onChange={e => setRegisterPassword(e.target.value)}/>
                <button onClick={registerUser}
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Registrar
                </button>
            </div>
        </>
    )
}