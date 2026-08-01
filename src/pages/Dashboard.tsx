import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Tours from './Tours';
import DashboardCards from '../components/DashboardCards';
import { obtenerTours } from '../services/tourService';
import type { Tour } from '../interfaces/Tour';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tours, setTours] = useState<Tour[]>([]);

  // Cargar tours para pasarlos a las tarjetas
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datos = await obtenerTours();
        setTours(datos);
      } catch (error) {
        console.error("Error cargando datos para dashboard", error);
      }
    };
    cargarDatos();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar Lateral */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Superior */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Contenido Principal con Scroll */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard General</h1>
          
          {/* ETAPA 9 & 10: Tarjetas de Indicadores */}
          <DashboardCards tours={tours} />

          {/* ETAPA 10: Sección de Tours (con todas las mejoras del reto) */}
          <section className="mb-10">
            <Tours />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;