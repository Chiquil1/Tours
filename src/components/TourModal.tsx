import React, { useState } from 'react';

interface TourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGuardar: (tour: any) => void;
}

const TourModal: React.FC<TourModalProps> = ({ isOpen, onClose, onGuardar }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    destino: '',
    precio: 0,
    duracion: '',
    cupos: 0,
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' || name === 'cupos' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Nuevo Tour</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="nombre" placeholder="Nombre" className="w-full border p-2 rounded" onChange={handleChange} required />
          <input name="destino" placeholder="Destino" className="w-full border p-2 rounded" onChange={handleChange} required />
          <input name="precio" type="number" placeholder="Precio" className="w-full border p-2 rounded" onChange={handleChange} required />
          <input name="duracion" placeholder="Duración" className="w-full border p-2 rounded" onChange={handleChange} required />
          <input name="cupos" type="number" placeholder="Cupos" className="w-full border p-2 rounded" onChange={handleChange} required />
          
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TourModal;