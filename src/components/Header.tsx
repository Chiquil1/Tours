import React from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-blue-700 text-white p-5 shadow flex justify-between items-center">
      <div className="flex items-center gap-4">
        {/* Botón solo visible en móviles para abrir el sidebar */}
        <button 
          onClick={onMenuClick}
          className="md:hidden text-white hover:text-gray-200 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">
          Sistema de Gestión de Tours
        </h1>
      </div>
      
      {/* Espacio vacío o usuario si lo deseas en el futuro */}
      <div className="hidden md:block"></div>
    </header>
  );
};

export default Header;