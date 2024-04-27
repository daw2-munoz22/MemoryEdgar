import  { useState } from 'react';
import Swal from 'sweetalert2';
import { supabase } from '../database/supabase';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');

  async function resetPassword() {
    try {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email);
      if (error) {
        throw error;
      }
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Se ha enviado un correo electrónico con un enlace para restablecer tu contraseña.',
      });
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo restablecer la contraseña. Por favor, inténtalo de nuevo.',
      });
    }
  }

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white">Restablecer Contraseña</h2>
      </div>
      <div className="rounded-md shadow-sm border border-gray-300 p-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          className="form-input mb-4 text-black"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          onClick={resetPassword}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Restablecer Contraseña
        </button>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
