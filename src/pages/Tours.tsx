import React, { useEffect, useState } from 'react';
import { eliminarTour, obtenerTours } from '../services/tourService';
import type { Tour } from '../interfaces/Tour';
import TourModal from '../components/TourModal';

const Tours: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [toursFiltrados, setToursFiltrados] = useState<Tour[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tourSeleccionado, setTourSeleccionado] = useState<Tour | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para el Reto Final (Búsqueda y Ordenamiento)
  const [busqueda, setBusqueda] = useState('');
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  const cargarTours = async () => {
    try {
      setCargando(true);
      const datos = await obtenerTours();
      setTours(datos);
      setToursFiltrados(datos);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los tours. Verifica el backend.');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const borrarTour = async (id: string) => {
    // Confirmación antes de eliminar
    if (confirm('¿Estás seguro de que deseas eliminar este tour? Esta acción no se puede deshacer.')) {
      try {
        await eliminarTour(id);
        alert('Tour eliminado correctamente');
        cargarTours(); // Recarga automática
      } catch (error) {
        alert('Error al eliminar el tour');
        console.error(error);
      }
    }
  };

  const abrirModalEdicion = (tour: Tour) => {
    setTourSeleccionado(tour);
    setMostrarModal(true);
  };

  const abrirModalCreacion = () => {
    setTourSeleccionado(null);
    setMostrarModal(true);
  };

  // Lógica de Búsqueda y Ordenamiento
  useEffect(() => {
    let resultado = [...tours];

    // Filtrar por nombre
    if (busqueda) {
      resultado = resultado.filter(tour => 
        tour.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        tour.destino.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Ordenar por precio
    resultado.sort((a, b) => 
      ordenAscendente ? a.precio - b.precio : b.precio - a.precio
    );

    setToursFiltrados(resultado);
  }, [busqueda, ordenAscendente, tours]);

  useEffect(() => {
    cargarTours();
  }, []);

  if (cargando) return <div className="p-6 text-center text-blue-600 font-bold">Cargando datos del dashboard...</div>;
  if (error) return <div className="p-6 text-red-500 text-center bg-red-100 rounded">{error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Encabezado con Botón Nuevo */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Administración de Tours</h2>
        <button 
          onClick={abrirModalCreacion}
          className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors shadow-lg flex items-center gap-2"
        >
          <span>+</span> Nuevo Tour
        </button>
      </div>

      {/* Barra de Herramientas: Búsqueda y Ordenamiento (Reto Final) */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex-1">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre o destino..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <button
          onClick={() => setOrdenAscendente(!ordenAscendente)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
        >
          <span>Ordenar por Precio</span>
          <span className="text-xl">{ordenAscendente ? '⬆️' : '⬇️'}</span>
        </button>
      </div>
      
      {/* Tabla de Datos */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destino</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cupos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {toursFiltrados.length > 0 ? (
              toursFiltrados.map((tour) => (
                <tr key={tour._id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tour.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.destino}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">${tour.precio}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.duracion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.cupos}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => abrirModalEdicion(tour)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-xs hover:bg-yellow-600 transition-colors"
                        title="Editar tour"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => borrarTour(tour._id!)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                        title="Eliminar tour"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500 italic">
                  {busqueda ? 'No se encontraron tours que coincidan con tu búsqueda.' : 'No hay tours registrados.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Integrado */}
      <TourModal 
        isOpen={mostrarModal} 
        onClose={() => setMostrarModal(false)} 
        onRefresh={cargarTours}
        tourParaEditar={tourSeleccionado}
      />
    </div>
  );
};

export default Tours;