const URL = "http://localhost:3001/api/tours";

// Obtener todos los tours
export const obtenerTours = async () => {
  const respuesta = await fetch(URL);
  if (!respuesta.ok) throw new Error("Error al obtener tours");
  return await respuesta.json();
};

// Registrar un nuevo tour
export const registrarTour = async (tour: any) => {
  const respuesta = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tour)
  });
  if (!respuesta.ok) throw new Error("Error al registrar tour");
  return await respuesta.json();
};

// Actualizar un tour existente (Etapa 2)
export const actualizarTour = async (id: string, tour: any) => {
  const respuesta = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tour)
  });
  if (!respuesta.ok) throw new Error("Error al actualizar tour");
  return await respuesta.json();
};

// Eliminar un tour (Etapa 3)
export const eliminarTour = async (id: string) => {
  const respuesta = await fetch(`${URL}/${id}`, {
    method: "DELETE"
  });
  if (!respuesta.ok) throw new Error("Error al eliminar tour");
  return await respuesta.json();
};