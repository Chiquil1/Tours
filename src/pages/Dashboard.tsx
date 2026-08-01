import React from 'react';
import Tours from './Tours';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard General</h1>
      
      {/* Aquí irán las Cards e Indicadores más adelante */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Total Tours</h3>
          <p className="text-2xl font-bold">Cargando...</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Cupos Disponibles</h3>
          <p className="text-2xl font-bold">Cargando...</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Ingresos Potenciales</h3>
          <p className="text-2xl font-bold">Cargando...</p>
        </div>
      </div>

      {/* Sección de Tours */}
      <section>
        <Tours />
      </section>
    </div>
  );
};

export default Dashboard;