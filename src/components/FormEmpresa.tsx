import { useState } from "react";
import type {
  EstadoEmpresa,
  Modalidad,
  NuevaEmpresa
} from "../types/Empresa";

interface FormEmpresaProps {
  onCrear: (empresa: NuevaEmpresa) => Promise<void>;
  guardando: boolean;
}

const formularioInicial: NuevaEmpresa = {
  nombre: "",
  sector: "",
  ciudad: "",
  contacto: "",
  correo: "",
  telefono: "",
  vacantes: 1,
  modalidad: "Presencial",
  estado: "Disponible"
};

function FormEmpresa({
  onCrear,
  guardando
}: FormEmpresaProps) {
  const [formulario, setFormulario] =
    useState<NuevaEmpresa>(formularioInicial);

  const actualizarCampo = <K extends keyof NuevaEmpresa>(
    campo: K,
    valor: NuevaEmpresa[K]
  ) => {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor
    }));
  };

  const cambiarVacantes = (valor: number) => {
    setFormulario((anterior) => ({
      ...anterior,
      vacantes: valor,
      estado:
        valor === 0
          ? "Sin vacantes"
          : anterior.estado === "Sin vacantes"
            ? "Disponible"
            : anterior.estado
    }));
  };

  const manejarSubmit = async (
    evento: React.FormEvent<HTMLFormElement>
  ) => {
    evento.preventDefault();

    await onCrear(formulario);

    setFormulario(formularioInicial);
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <span className="eyebrow">NUEVO REGISTRO</span>
          <h2>Registrar empresa</h2>
        </div>
        <span className="badge">MongoDB</span>
      </div>

      <form className="empresa-form" onSubmit={manejarSubmit}>
        <div className="campo campo-doble">
          <label htmlFor="nombre">Nombre de la empresa</label>
          <input
            id="nombre"
            value={formulario.nombre}
            onChange={(e) =>
              actualizarCampo("nombre", e.target.value)
            }
            placeholder="Ej. Data Maya"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="sector">Sector</label>
          <input
            id="sector"
            value={formulario.sector}
            onChange={(e) =>
              actualizarCampo("sector", e.target.value)
            }
            placeholder="Tecnologías de la Información"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="ciudad">Ciudad</label>
          <input
            id="ciudad"
            value={formulario.ciudad}
            onChange={(e) =>
              actualizarCampo("ciudad", e.target.value)
            }
            placeholder="Cancún"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="contacto">Contacto</label>
          <input
            id="contacto"
            value={formulario.contacto}
            onChange={(e) =>
              actualizarCampo("contacto", e.target.value)
            }
            placeholder="Nombre del contacto"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="correo">Correo</label>
          <input
            id="correo"
            type="email"
            value={formulario.correo}
            onChange={(e) =>
              actualizarCampo("correo", e.target.value)
            }
            placeholder="contacto@empresa.mx"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            value={formulario.telefono}
            onChange={(e) =>
              actualizarCampo("telefono", e.target.value)
            }
            placeholder="9981234567"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="vacantes">Vacantes</label>
          <input
            id="vacantes"
            type="number"
            min="0"
            step="1"
            value={formulario.vacantes}
            onChange={(e) =>
              cambiarVacantes(Number(e.target.value))
            }
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="modalidad">Modalidad</label>
          <select
            id="modalidad"
            value={formulario.modalidad}
            onChange={(e) =>
              actualizarCampo(
                "modalidad",
                e.target.value as Modalidad
              )
            }
          >
            <option value="Presencial">Presencial</option>
            <option value="Híbrida">Híbrida</option>
            <option value="Remota">Remota</option>
          </select>
        </div>

        <div className="campo">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            value={formulario.estado}
            onChange={(e) =>
              actualizarCampo(
                "estado",
                e.target.value as EstadoEmpresa
              )
            }
          >
            <option value="Disponible">Disponible</option>
            <option value="Sin vacantes">Sin vacantes</option>
            <option value="Inactiva">Inactiva</option>
          </select>
        </div>

        <div className="acciones-form">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={guardando}
          >
            {guardando ? "Guardando..." : "Guardar empresa"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default FormEmpresa;
