import React, { useEffect, useState } from 'react';
import { registrarTour, actualizarTour } from '../services/tourService';
import type { Tour } from '../interfaces/Tour';

interface TourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  tourEditar: Tour | null;
}

const TourModal: React.FC<TourModalProps> = ({ isOpen, onClose, onRefresh, tourEditar }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    destino: '',
    precio: 0,
    duracion: '',
    cupos: 0
  });

  // Llenar el formulario si estamos editando
  useEffect(() => {
    if (tourEditar) {
      setFormData({
        nombre: tourEditar.nombre,
        destino: tourEditar.destino,
        precio: tourEditar.precio,
        duracion: tourEditar.duracion,
        cupos: tourEditar.cupos
      });
    } else {
      // Resetear si es nuevo
      setFormData({ nombre: '', destino: '', precio: 0, duracion: '', cupos: 0 });
    }
  }, [tourEditar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (tourEditar) {
        await actualizarTour(tourEditar._id!, formData);
        alert('Tour actualizado correctamente');
      } else {
        await registrarTour(formData);
        alert('Tour registrado correctamente');
      }
      onRefresh();
      onClose();
    } catch (error) {
      alert('Error al guardar el tour');
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96 shadow-xl">
        <h2 className="text-2xl font-bold mb-5">
          {tourEditar ? 'Editar Tour' : 'Nuevo Tour'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input 
            className="border w-full p-2 mb-3 rounded" 
            placeholder="Nombre" 
            value={formData.nombre}
            onChange={e => setFormData({...formData, nombre: e.target.value})}
            required 
          />
          <input 
            className="border w-full p-2 mb-3 rounded" 
            placeholder="Destino" 
            value={formData.destino}
            onChange={e => setFormData({...formData, destino: e.target.value})}
            required 
          />
          <input 
            type="number"
            className="border w-full p-2 mb-3 rounded" 
            placeholder="Precio" 
            value={formData.precio}
            onChange={e => setFormData({...formData, precio: Number(e.target.value)})}
            required 
          />
          <input 
            className="border w-full p-2 mb-3 rounded" 
            placeholder="Duración" 
            value={formData.duracion}
            onChange={e => setFormData({...formData, duracion: e.target.value})}
            required 
          />
          <input 
            type="number"
            className="border w-full p-2 mb-3 rounded" 
            placeholder="Cupos" 
            value={formData.cupos}
            onChange={e => setFormData({...formData, cupos: Number(e.target.value)})}
            required 
          />
          <div className="flex justify-end gap-2 mt-4">
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
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TourModal;