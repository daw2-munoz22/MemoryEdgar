import { useState } from 'react';
import Swal from 'sweetalert2';
import { User } from '../database/model/user';
import { Navigate } from 'react-router-dom';
import ForgotPasswordForm from './ForgotPasswordForm';
import { supabase } from '../database/supabase';


function RegisterLoginForm() {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false); // Estado para mostrar/ocultar el formulario de restablecimiento de contraseña

  async function register() {
    if (registerUsername && registerPassword) {
      try {
        const { error } = await supabase.auth.signUp({
          email: registerUsername, // Asigna el correo electrónico ingresado
          password: registerPassword, // Asigna la contraseña ingresada
        });
  
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

  async function login() {
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
  }
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Enregistra't</h2>
        </div>
        <div className="rounded-md shadow-sm border border-gray-300 p-4">
          <input type="text" placeholder="Nom d'usuari" className="form-input mb-4 text-black" value={registerUsername} onChange={e => setRegisterUsername(e.target.value)} />
          <input type="password" placeholder="Contrasenya" className="form-input mb-4 text-black" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} />
          <button onClick={register} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Registrar</button>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Inicia Sessió</h2>
        </div>
        <div className="rounded-md shadow-sm border border-gray-300 p-4">
          <input type="text" placeholder="Nom d'usuari" className="form-input mb-4 text-black" value={loginUsername} onChange={e => setLoginUsername(e.target.value)} />
          <input type="password" placeholder="Contrasenya" className="form-input mb-4 text-black" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
          <button onClick={login} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Iniciar Sessió</button>
        </div>
        <div className="rounded-md shadow-sm border border-gray-300 p-4">
          <button onClick={() => setShowForgotPasswordForm(true)} className="mt-2 text-sm text-indigo-600 hover:text-indigo-500">Has oblidat la contrasenya?</button>
          {showForgotPasswordForm && <ForgotPasswordForm />} {/* Renderiza el formulario de restablecimiento de contraseña si showForgotPasswordForm es verdadero */}
        </div>
      </div>
    </div>
  );
}

export default RegisterLoginForm;
