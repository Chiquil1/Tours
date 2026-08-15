import {
  useCallback,
  useEffect,
  useState
} from "react";
import type { FormEvent } from "react";
import FormEmpresa from "./components/FormEmpresa";
import TablaEmpresas from "./components/TablaEmpresas";
import {
  actualizarEmpresa,
  buscarEmpresas,
  crearEmpresa,
  eliminarEmpresa,
  obtenerEmpresas,
  obtenerEmpresasConVacantes
} from "./services/empresaService";
import type {
  ActualizacionEmpresa,
  Empresa,
  NuevaEmpresa
} from "./types/Empresa";

function App() {
  const [empresas, setEmpresas] =
    useState<Empresa[]>([]);
  const [textoBusqueda, setTextoBusqueda] =
    useState("");
  const [cargando, setCargando] =
    useState(true);
  const [guardando, setGuardando] =
    useState(false);
  const [procesandoId, setProcesandoId] =
    useState<string | null>(null);
  const [mensaje, setMensaje] =
    useState("");
  const [error, setError] =
    useState("");

  const limpiarAvisos = () => {
    setMensaje("");
    setError("");
  };

  const cargarTodas = useCallback(async () => {
    limpiarAvisos();
    setCargando(true);

    try {
      const datos = await obtenerEmpresas();
      setEmpresas(datos);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible cargar las empresas"
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    void cargarTodas();
  }, [cargarTodas]);

  const manejarCrear = async (
    empresa: NuevaEmpresa
  ) => {
    limpiarAvisos();
    setGuardando(true);

    try {
      await crearEmpresa(empresa);
      setMensaje("Empresa registrada correctamente.");
      setTextoBusqueda("");

      const datos = await obtenerEmpresas();
      setEmpresas(datos);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible registrar la empresa"
      );

      throw err;
    } finally {
      setGuardando(false);
    }
  };

  const manejarBusqueda = async (
    evento: FormEvent<HTMLFormElement>
  ) => {
    evento.preventDefault();
    limpiarAvisos();

    const texto = textoBusqueda.trim();

    if (!texto) {
      await cargarTodas();
      return;
    }

    setCargando(true);

    try {
      const datos = await buscarEmpresas(texto);
      setEmpresas(datos);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible realizar la búsqueda"
      );
    } finally {
      setCargando(false);
    }
  };

  const manejarConVacantes = async () => {
    limpiarAvisos();
    setCargando(true);

    try {
      const datos =
        await obtenerEmpresasConVacantes();

      setEmpresas(datos);
      setMensaje(
        "Mostrando únicamente empresas con vacantes disponibles."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible aplicar el filtro"
      );
    } finally {
      setCargando(false);
    }
  };

  const manejarActualizar = async (
    id: string,
    cambios: ActualizacionEmpresa
  ) => {
    limpiarAvisos();
    setProcesandoId(id);

    try {
      await actualizarEmpresa(id, cambios);
      setMensaje("Empresa actualizada correctamente.");

      const datos = await obtenerEmpresas();
      setEmpresas(datos);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible actualizar la empresa"
      );
    } finally {
      setProcesandoId(null);
    }
  };

  const manejarEliminar = async (
    id: string
  ) => {
    const confirmar = window.confirm(
      "¿Deseas eliminar esta empresa?"
    );

    if (!confirmar) {
      return;
    }

    limpiarAvisos();
    setProcesandoId(id);

    try {
      await eliminarEmpresa(id);
      setMensaje("Empresa eliminada correctamente.");

      const datos = await obtenerEmpresas();
      setEmpresas(datos);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible eliminar la empresa"
      );
    } finally {
      setProcesandoId(null);
    }
  };

  return (
    <main className="app">
      <header className="hero">
        <div className="hero-contenido">
          <span className="hero-etiqueta">
            Administración de Bases de Datos
          </span>

          <h1>
            Empresas para Estadías Profesionales
          </h1>

          <p>
            Registro, consulta y administración de empresas
            mediante React, Express y MongoDB.
          </p>

          <div className="hero-estadisticas">
            <div>
              <strong>{empresas.length}</strong>
              <span>Resultados visibles</span>
            </div>

            <div>
              <strong>MongoDB</strong>
              <span>Persistencia</span>
            </div>

            <div>
              <strong>CRUD</strong>
              <span>Operaciones completas</span>
            </div>
          </div>
        </div>
      </header>

      <div className="contenido">
        <FormEmpresa
          onCrear={manejarCrear}
          guardando={guardando}
        />

        <section className="panel">
          <div className="panel-header panel-header-responsive">
            <div>
              <span className="eyebrow">
                CONSULTA DE DATOS
              </span>
              <h2>Empresas registradas</h2>
            </div>

            <div className="contador">
              {empresas.length} resultado
              {empresas.length === 1 ? "" : "s"}
            </div>
          </div>

          <div className="barra-herramientas">
            <form
              className="buscador"
              onSubmit={manejarBusqueda}
            >
              <input
                type="search"
                value={textoBusqueda}
                onChange={(e) =>
                  setTextoBusqueda(e.target.value)
                }
                placeholder="Buscar empresa por nombre..."
              />

              <button
                className="btn btn-primary"
                type="submit"
              >
                Buscar
              </button>
            </form>

            <div className="filtros">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() =>
                  void manejarConVacantes()
                }
              >
                Con vacantes
              </button>

              <button
                className="btn btn-light"
                type="button"
                onClick={() => {
                  setTextoBusqueda("");
                  void cargarTodas();
                }}
              >
                Mostrar todas
              </button>
            </div>
          </div>

          {mensaje && (
            <div className="alerta exito">
              {mensaje}
            </div>
          )}

          {error && (
            <div className="alerta error">
              {error}
            </div>
          )}

          {cargando ? (
            <div className="cargando">
              Consultando MongoDB...
            </div>
          ) : (
            <TablaEmpresas
              empresas={empresas}
              onActualizar={manejarActualizar}
              onEliminar={manejarEliminar}
              procesandoId={procesandoId}
            />
          )}
        </section>
      </div>

      <footer>
        Sistema de Registro de Empresas para Estadías
        Profesionales
      </footer>
    </main>
  );
}

export default App;
