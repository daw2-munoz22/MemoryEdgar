import {supabase} from "../database/supabase.js";
import Swal from "sweetalert2";
import {useState} from "react";

export const RegisterAuth = () => {
    const [registerRePassword, setregisterRePassword] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');


    async function registerUser() {
        //Authorize
        if (registerEmail && registerPassword && registerRePassword  ) {
            try {
                /**/
                let { data, error } = await supabase.auth.signUp({
                    email: registerEmail,
                    password: registerPassword
                })

                //Perfil User
                Swal.fire({
                    title: error.code === 200 ? 'Éxito' : 'Error',
                    text: error.message,
                    icon: error.code === 200 ? 'success' : 'error'
                });

            } catch (error) {
                console.error('Error al registrar el usuario:', error.message);
                Swal.fire({
                    icon: 'info',
                    title: 'Error',
                    text: 'Se ha enviado un correo, por favor, verifica su email.',
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
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Register
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
                                    value={registerEmail}
                                    type="email"
                                    autoComplete="email"
                                    required
                                    onChange={e => setRegisterEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2 mb-2">
                                <input
                                    id="password"
                                    name="password"
                                    value={registerPassword}
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={e => setRegisterPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Repeat password
                                </label>
                            </div>

                            <div className="mt-2">
                                <input
                                    id="re-password"
                                    value={registerRePassword}
                                    name="re-password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={e => setregisterRePassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                id="enviar" type="button" onClick={registerUser}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}