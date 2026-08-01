const URL = "http://localhost:3001/api/tours"; // Asegúrate que el puerto sea 3001 como tu backend

export const obtenerTours = async () => {
  try {
    const respuesta = await fetch(URL);
    if (!respuesta.ok) {
      throw new Error('Error al obtener los tours');
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Error en el servicio:", error);
    throw error;
  }
};
