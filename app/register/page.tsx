// pages/register.js
import React from 'react';
import RegisterForm from './form';
const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Register</h2>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
