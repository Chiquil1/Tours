import React, { useEffect, useState } from 'react';
import { registrarTour, actualizarTour } from '../services/tourService';
import type { Tour } from '../interfaces/Tour';

interface TourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  tourParaEditar?: Tour | null; // Si hay un tour, es modo edición
}

const TourModal: React.FC<TourModalProps> = ({ isOpen, onClose, onRefresh, tourParaEditar }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    destino: '',
    precio: '',
    duracion: '',
    cupos: ''
  });

  // Cargar datos si estamos editando
  useEffect(() => {
    if (tourParaEditar) {
      setFormData({
        nombre: tourParaEditar.nombre,
        destino: tourParaEditar.destino,
        precio: String(tourParaEditar.precio),
        duracion: tourParaEditar.duracion,
        cupos: String(tourParaEditar.cupos)
      });
    } else {
      // Limpiar formulario si es nuevo
      setFormData({ nombre: '', destino: '', precio: '', duracion: '', cupos: '' });
    }
  }, [tourParaEditar, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tourData = {
      ...formData,
      precio: Number(formData.precio),
      cupos: Number(formData.cupos)
    };

    try {
      if (tourParaEditar) {
        // Modo Edición
        await actualizarTour(tourParaEditar._id!, tourData);
        alert('Tour actualizado correctamente');
      } else {
        // Modo Creación
        await registrarTour(tourData);
        alert('Tour registrado correctamente');
      }
      
      onRefresh(); // Recargar la lista
      onClose();   // Cerrar modal
    } catch (error) {
      console.error(error);
      alert('Error al guardar el tour');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold mb-5 text-gray-800">
          {tourParaEditar ? 'Editar Tour' : 'Nuevo Tour'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Nombre" 
            value={formData.nombre}
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            required
          />
          <input 
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Destino" 
            value={formData.destino}
            onChange={(e) => setFormData({...formData, destino: e.target.value})}
            required
          />
          <input 
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Precio" 
            type="number"
            value={formData.precio}
            onChange={(e) => setFormData({...formData, precio: e.target.value})}
            required
          />
          <input 
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Duración" 
            value={formData.duracion}
            onChange={(e) => setFormData({...formData, duracion: e.target.value})}
            required
          />
          <input 
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Cupos" 
            type="number"
            value={formData.cupos}
            onChange={(e) => setFormData({...formData, cupos: e.target.value})}
            required
          />
          
          <div className="flex justify-end gap-2 mt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              {tourParaEditar ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TourModal;