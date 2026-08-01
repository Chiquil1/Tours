import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './pages/Dashboard'; // Asegúrate de que esta ruta sea correcta
import Dashboard from './pages/Dashboard';
import Tours from './pages/Tours';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* El Layout envuelve todas las rutas internas */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tours" element={<Tours />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;