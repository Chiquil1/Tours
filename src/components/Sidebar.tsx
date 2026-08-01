import React from 'react';
import { Link } from 'react-router-dom';

// Definimos las props para quitar el error de TypeScript
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay oscuro para móvil cuando el sidebar está abierto */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden" 
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar con TUS estilos originales (w-64, bg-gray-800, etc.) */}
      <aside 
        className={`
          fixed md:static inset-y-0 left-0 z-30
          w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col h-full shadow-xl
        `}
      >
        {/* Logo / Título */}
        <div className="h-16 flex items-center justify-center border-b border-gray-700 bg-gray-900">
          <h2 className="text-2xl font-bold text-blue-400 tracking-wide">Tours App</h2>
        </div>

        {/* Menú de Navegación */}
        <nav className="flex-1 py-6 space-y-2 overflow-y-auto">
          <Link 
            to="/" 
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors border-l-4 border-transparent hover:border-blue-500"
            onClick={() => window.innerWidth < 768 && onClose()}
          >
            <span className="text-lg mr-3">📊</span>
            <span className="font-medium">Dashboard</span>
          </Link>
          
          <Link 
            to="/tours" 
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors border-l-4 border-transparent hover:border-blue-500"
            onClick={() => window.innerWidth < 768 && onClose()}
          >
            <span className="text-lg mr-3">🌴</span>
            <span className="font-medium">Tours</span>
          </Link>
        </nav>

        {/* Pie del sidebar (opcional) */}
        <div className="p-4 border-t border-gray-700 bg-gray-900">
          <p className="text-xs text-gray-500 text-center">v1.0.0</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;