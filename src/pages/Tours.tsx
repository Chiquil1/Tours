import React from 'react';
import { Tour } from '../interfaces/Tour';

const Tours: React.FC = () => {
  // Datos corregidos según la práctica guiada
  const toursData: Tour[] = [
    { 
      nombre: "Tour Chichén Itzá", 
      destino: "Yucatán", 
      precio: 2200, 
      duracion: "1 día", 
      cupos: 25 
    },
    { 
      nombre: "Tour Isla Mujeres", 
      destino: "Cancún", 
      precio: 1800, 
      duracion: "1 día", 
      cupos: 20 
    },
    { 
      nombre: "Tour Tulum", 
      destino: "Tulum", 
      precio: 1500, 
      duracion: "Medio día", 
      cupos: 30 
    },
    { 
      nombre: "Tour Bacalar", 
      destino: "Bacalar", 
      precio: 1400, 
      duracion: "1 día", 
      cupos: 15 
    },
    { 
      nombre: "Tour Holbox", 
      destino: "Holbox", 
      precio: 2600, 
      duracion: "2 días", 
      cupos: 18 
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Tours</h1>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destino</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cupos</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {toursData.map((tour, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tour.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.destino}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${tour.precio}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.duracion}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.cupos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tours;