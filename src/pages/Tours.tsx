import React, { useEffect, useState } from 'react';
import TourModal from "../components/TourModal";
import { eliminarTour, obtenerTours } from '../services/tourService';
import type { Tour } from '../interfaces/Tour';

const Tours: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tourSeleccionado, setTourSeleccionado] = useState<Tour | null>(null); // Para editar
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarTours = async () => {
    try {
      const datos = await obtenerTours();
      setTours(datos);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los tours. Verifica el backend.');
    } finally {
      setCargando(false);
    }
  };

  const borrarTour = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este tour?')) {
      await eliminarTour(id);
      cargarTours();
    }
  };

  // Función para preparar la edición
  const editarTour = (tour: Tour) => {
    setTourSeleccionado(tour);
    setMostrarModal(true);
  };

  // Función para cerrar modal y limpiar selección
  const cerrarModal = () => {
    setMostrarModal(false);
    setTourSeleccionado(null);
  };

  useEffect(() => {
    cargarTours();
  }, []);

  if (cargando) return <div className="p-6">Cargando tours...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold">Administración de Tours</h2>
        <button 
          onClick={() => {
            setTourSeleccionado(null); // Limpiar selección para crear nuevo
            setMostrarModal(true);
          }}
          className="bg-blue-700 text-white px-5 py-2 rounded hover:bg-blue-800"
        >
          Nuevo Tour
        </button>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destino</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duración</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cupos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tours.length > 0 ? (
              tours.map((tour) => (
                <tr key={tour._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tour.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.destino}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${tour.precio}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.duracion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.cupos}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => editarTour(tour)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => borrarTour(tour._id!)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No hay tours registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal conectado con lógica de edición/creación */}
      {mostrarModal && (
        <TourModal
          isOpen={mostrarModal}
          onClose={cerrarModal}
          onRefresh={cargarTours}
          tourEditar={tourSeleccionado}
        />
      )}
    </div>
  );
};

export default Tours;