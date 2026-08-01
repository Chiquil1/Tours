const URL = "http://localhost:3001/api/tours";

export const obtenerTours = async () => {
  const respuesta = await fetch(URL);
  if (!respuesta.ok) throw new Error("Error al obtener tours");
  return await respuesta.json();
};

// Nueva función para crear
export const crearTour = async (nuevoTour: any) => {
  const respuesta = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoTour),
  });
  if (!respuesta.ok) throw new Error("Error al crear tour");
  return await respuesta.json();
};