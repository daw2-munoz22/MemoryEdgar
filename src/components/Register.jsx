import {useState} from "react";
import {supabase} from "../database/supabase.js";
import Swal from "sweetalert2";
import SaltManager from "../manager/cryptography/SaltManager";


export const Register = () => {
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    async function registerUser() {
        if (registerUsername && registerPassword) {
            try {
                let saltManager = new SaltManager();
                //construir clase que genere salt + contraseña . la junta y genera un hash de los 2
                //crear metodo get que devuelva eso

                let salt = saltManager.getSalt();




                let { data, error } = await supabase.auth.signUp({
                    email: registerUsername,
                    password: salt + registerPassword
                })

                if (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al registrar el usuario. Por favor, inténtalo de nuevo.',
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Usuario registrado con éxito.',
                    });
                }
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
                <input type="password" placeholder="Contrasenya" className="form-input mb-4 text-black"
                       value={registerPassword} onChange={e => setRegisterPassword(e.target.value)}/>
                <button onClick={registerUser}
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Registrar
                </button>
            </div>
        </>
    )
}