import React from 'react';
import type { Tour } from '../interfaces/Tour';

interface DashboardCardsProps {
  tours: Tour[];
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ tours }) => {
  // Cálculos dinámicos
  const totalTours = tours.length;
  
  const precioPromedio = totalTours > 0 
    ? tours.reduce((acc, tour) => acc + tour.precio, 0) / totalTours 
    : 0;

  const tourMasCaro = totalTours > 0 
    ? Math.max(...tours.map(t => t.precio)) 
    : 0;

  const tourMasEconomico = totalTours > 0 
    ? Math.min(...tours.map(t => t.precio)) 
    : 0;

  const totalCupos = tours.reduce((acc, tour) => acc + tour.cupos, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {/* Total Tours */}
      <div className="bg-blue-700 text-white p-5 rounded-lg shadow-md transform hover:scale-105 transition-transform">
        <h3 className="text-sm font-medium opacity-90">Total Tours</h3>
        <h1 className="text-4xl font-bold mt-2">{totalTours}</h1>
      </div>

      {/* Precio Promedio */}
      <div className="bg-green-700 text-white p-5 rounded-lg shadow-md transform hover:scale-105 transition-transform">
        <h3 className="text-sm font-medium opacity-90">Precio Promedio</h3>
        <h1 className="text-3xl font-bold mt-2">${precioPromedio.toFixed(0)}</h1>
      </div>

      {/* Más Caro */}
      <div className="bg-purple-700 text-white p-5 rounded-lg shadow-md transform hover:scale-105 transition-transform">
        <h3 className="text-sm font-medium opacity-90">Más Caro</h3>
        <h1 className="text-3xl font-bold mt-2">${tourMasCaro}</h1>
      </div>

      {/* Más Económico */}
      <div className="bg-orange-600 text-white p-5 rounded-lg shadow-md transform hover:scale-105 transition-transform">
        <h3 className="text-sm font-medium opacity-90">Más Económico</h3>
        <h1 className="text-3xl font-bold mt-2">${tourMasEconomico}</h1>
      </div>

      {/* Cupos Totales */}
      <div className="bg-red-600 text-white p-5 rounded-lg shadow-md transform hover:scale-105 transition-transform">
        <h3 className="text-sm font-medium opacity-90">Cupos Disponibles</h3>
        <h1 className="text-4xl font-bold mt-2">{totalCupos}</h1>
      </div>
    </div>
  );
};

export default DashboardCards;