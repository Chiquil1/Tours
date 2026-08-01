import React, { useEffect, useState } from 'react';
import { obtenerTours, crearTour } from '../services/tourService';
import type { Tour } from '../interfaces/Tour';
import TourModal from '../components/TourModal';

const Tours: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estado para el modal
  const [modalAbierto, setModalAbierto] = useState(false);

  const cargarTours = async () => {
    try {
      const datos = await obtenerTours();
      setTours(datos);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los tours. Verifica que el backend esté corriendo.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTours();
  }, []);

  const handleGuardarTour = async (nuevoTour: any) => {
    try {
      await crearTour(nuevoTour);
      await cargarTours(); // Recargar la lista
      alert('Tour creado exitosamente');
    } catch (err) {
      alert('Error al crear el tour');
    }
  };

  if (cargando) return <div className="p-6">Cargando tours...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      {/* Encabezado con Botón */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Administración de Tours</h1>
        <button 
          onClick={() => setModalAbierto(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow"
        >
          + Nuevo Tour
        </button>
      </div>
      
      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destino</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duración</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cupos</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tours.length > 0 ? (
              tours.map((tour) => (
                <tr key={tour._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{tour.nombre}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{tour.destino}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">${tour.precio}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{tour.duracion}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{tour.cupos}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="text-center py-4">No hay tours registrados</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <TourModal 
        isOpen={modalAbierto} 
        onClose={() => setModalAbierto(false)} 
        onGuardar={handleGuardarTour} 
      />
    </div>
  );
};

export default Tours;