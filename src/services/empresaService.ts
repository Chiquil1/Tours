import type {
  ActualizacionEmpresa,
  Empresa,
  NuevaEmpresa
} from "../types/Empresa";

const API_URL = "http://localhost:3001/api/empresas";

const procesarRespuesta = async <T>(
  respuesta: Response
): Promise<T> => {
  if (!respuesta.ok) {
    let mensaje = "Ocurrió un error al comunicarse con el servidor";

    try {
      const datos = (await respuesta.json()) as {
        mensaje?: string;
      };

      if (datos.mensaje) {
        mensaje = datos.mensaje;
      }
    } catch {
      // La respuesta no contenía JSON.
    }

    throw new Error(mensaje);
  }

  return respuesta.json() as Promise<T>;
};

export const obtenerEmpresas = async (): Promise<Empresa[]> => {
  const respuesta = await fetch(API_URL);
  return procesarRespuesta<Empresa[]>(respuesta);
};

export const buscarEmpresas = async (
  texto: string
): Promise<Empresa[]> => {
  const respuesta = await fetch(
    `${API_URL}/buscar?texto=${encodeURIComponent(texto)}`
  );

  return procesarRespuesta<Empresa[]>(respuesta);
};

export const obtenerEmpresasConVacantes =
  async (): Promise<Empresa[]> => {
    const respuesta = await fetch(
      `${API_URL}?conVacantes=true`
    );

    return procesarRespuesta<Empresa[]>(respuesta);
  };

export const crearEmpresa = async (
  empresa: NuevaEmpresa
): Promise<Empresa> => {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(empresa)
  });

  return procesarRespuesta<Empresa>(respuesta);
};

export const actualizarEmpresa = async (
  id: string,
  cambios: ActualizacionEmpresa
): Promise<Empresa> => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cambios)
  });

  return procesarRespuesta<Empresa>(respuesta);
};

export const eliminarEmpresa = async (
  id: string
): Promise<void> => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  await procesarRespuesta<{ mensaje: string }>(respuesta);
};
