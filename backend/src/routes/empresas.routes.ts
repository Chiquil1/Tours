import { Router } from "express";
import {
  obtenerEmpresas,
  obtenerEmpresa,
  crearEmpresa,
  actualizarEmpresa,
  eliminarEmpresa,
  buscarEmpresas
} from "../controllers/empresas.controller.js";

const router = Router();

// Buscar debe ir antes de /:id
router.get("/buscar", buscarEmpresas);

// Listar empresas
// También permite: /api/empresas?conVacantes=true
router.get("/", obtenerEmpresas);

// Consultar empresa por ID
router.get("/:id", obtenerEmpresa);

// Registrar empresa
router.post("/", crearEmpresa);

// Actualizar vacantes o estado
router.put("/:id", actualizarEmpresa);

// Eliminar empresa
router.delete("/:id", eliminarEmpresa);

export default router;
