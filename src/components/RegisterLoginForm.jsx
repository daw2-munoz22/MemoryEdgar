import { useState } from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';

function RegisterLoginForm() {
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false); // Estado para mostrar/ocultar el formulario de restablecimiento de contraseña


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full space-y-8">

        <div className="rounded-md shadow-sm border border-gray-300 p-4">
          <button onClick={() => setShowForgotPasswordForm(true)} className="mt-2 text-sm text-indigo-600 hover:text-indigo-500">Has oblidat la contrasenya?</button>
          {showForgotPasswordForm && <ForgotPasswordForm />} {/* Renderiza el formulario de restablecimiento de contraseña si showForgotPasswordForm es verdadero */}
        </div>
      </div>
    </div>
  );
}

export default RegisterLoginForm;
