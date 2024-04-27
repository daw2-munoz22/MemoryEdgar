import {User} from "../database/model/user.js";
import Swal from "sweetalert2";
import {Navigate} from "react-router-dom";
import {useState} from "react";

export const Login = () => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    async function loginUser() {
        if (loginUsername && loginPassword) {
            try {
                const user = await User.login({ email: loginUsername, password: loginPassword }); // Utiliza el método login de la clase User para iniciar sesión
                if (user) {
                    Swal.fire('Sessió iniciada amb èxit');
                    // Aquí puedes redirigir al usuario a otra página, etc.
                    Navigate('/pokemonmemory'); // Redirige al usuario a la vista home
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Nom d\'usuari o contrasenya incorrectes.',
                    });
                }
            } catch (error) {
                console.error('Error al iniciar sesión:', error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Nom d\'usuari o contrasenya incorrectes.',
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
                <input type="text" placeholder="Nom d'usuari" className="form-input mb-4 text-black"
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