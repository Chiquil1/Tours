import { useEffect, useState } from "react";
import type {
  ActualizacionEmpresa,
  Empresa,
  EstadoEmpresa
} from "../types/Empresa";

interface TablaEmpresasProps {
  empresas: Empresa[];
  onActualizar: (
    id: string,
    cambios: ActualizacionEmpresa
  ) => Promise<void>;
  onEliminar: (id: string) => Promise<void>;
  procesandoId: string | null;
}

type Ediciones = Record<
  string,
  ActualizacionEmpresa
>;

function TablaEmpresas({
  empresas,
  onActualizar,
  onEliminar,
  procesandoId
}: TablaEmpresasProps) {
  const [ediciones, setEdiciones] =
    useState<Ediciones>({});

  useEffect(() => {
    const nuevasEdiciones: Ediciones = {};

    empresas.forEach((empresa) => {
      if (empresa._id) {
        nuevasEdiciones[empresa._id] = {
          vacantes: empresa.vacantes,
          estado: empresa.estado
        };
      }
    });

    setEdiciones(nuevasEdiciones);
  }, [empresas]);

  const cambiarVacantes = (
    id: string,
    vacantes: number
  ) => {
    setEdiciones((anterior) => {
      const actual = anterior[id];

      if (!actual) {
        return anterior;
      }

      return {
        ...anterior,
        [id]: {
          vacantes,
          estado:
            vacantes === 0
              ? "Sin vacantes"
              : actual.estado === "Sin vacantes"
                ? "Disponible"
                : actual.estado
        }
      };
    });
  };

  const cambiarEstado = (
    id: string,
    estado: EstadoEmpresa
  ) => {
    setEdiciones((anterior) => {
      const actual = anterior[id];

      if (!actual) {
        return anterior;
      }

      return {
        ...anterior,
        [id]: {
          ...actual,
          estado
        }
      };
    });
  };

  if (empresas.length === 0) {
    return (
      <div className="estado-vacio">
        <strong>No se encontraron empresas.</strong>
        <span>
          Prueba otra búsqueda o registra una nueva empresa.
        </span>
      </div>
    );
  }

  return (
    <div className="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Sector</th>
            <th>Ciudad</th>
            <th>Vacantes</th>
            <th>Modalidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {empresas.map((empresa) => {
            const id = empresa._id;

            if (!id) {
              return null;
            }

            const edicion = ediciones[id] ?? {
              vacantes: empresa.vacantes,
              estado: empresa.estado
            };

            const procesando = procesandoId === id;

            return (
              <tr key={id}>
                <td>
                  <strong>{empresa.nombre}</strong>
                  <small>{empresa.correo}</small>
                </td>

                <td>{empresa.sector}</td>
                <td>{empresa.ciudad}</td>

                <td>
                  <input
                    className="input-tabla input-numero"
                    type="number"
                    min="0"
                    step="1"
                    value={edicion.vacantes}
                    onChange={(e) =>
                      cambiarVacantes(
                        id,
                        Number(e.target.value)
                      )
                    }
                  />
                </td>

                <td>
                  <span className="modalidad">
                    {empresa.modalidad}
                  </span>
                </td>

                <td>
                  <select
                    className="input-tabla"
                    value={edicion.estado}
                    onChange={(e) =>
                      cambiarEstado(
                        id,
                        e.target.value as EstadoEmpresa
                      )
                    }
                  >
                    <option value="Disponible">
                      Disponible
                    </option>
                    <option value="Sin vacantes">
                      Sin vacantes
                    </option>
                    <option value="Inactiva">
                      Inactiva
                    </option>
                  </select>
                </td>

                <td>
                  <div className="acciones-tabla">
                    <button
                      className="btn btn-small btn-update"
                      type="button"
                      disabled={procesando}
                      onClick={() =>
                        void onActualizar(id, edicion)
                      }
                    >
                      Actualizar
                    </button>

                    <button
                      className="btn btn-small btn-delete"
                      type="button"
                      disabled={procesando}
                      onClick={() =>
                        void onEliminar(id)
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TablaEmpresas;
