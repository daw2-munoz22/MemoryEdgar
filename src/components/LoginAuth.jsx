import {useState} from "react";
import {useUser} from "../context/UserContext.jsx";
import {useNavigate} from "react-router-dom";
import {supabase} from "../database/supabase.js";
import Swal from "sweetalert2";

export const LoginAuth = () => {
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

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={loginUsername}
                                    onChange={e => setLoginUsername(e.target.value)}
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={loginPassword}
                                    onChange={e => setLoginPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={loginUser}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        <a href="/registerAuth" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            No tienes cuenta registrate
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}
