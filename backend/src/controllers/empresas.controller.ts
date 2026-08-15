import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { obtenerDB } from "../config/database.js";

const obtenerColeccion = () => {
  return obtenerDB().collection("empresas");
};

// GET /api/empresas
// GET /api/empresas?conVacantes=true
export const obtenerEmpresas = async (req: Request, res: Response) => {
  try {
    const filtro =
      req.query.conVacantes === "true"
        ? { vacantes: { $gt: 0 } }
        : {};

    const empresas = await obtenerColeccion()
      .find(filtro)
      .toArray();

    res.json(empresas);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las empresas",
      error
    });
  }
};

// GET /api/empresas/:id
export const obtenerEmpresa = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        mensaje: "ID de empresa no válido"
      });
    }

    const empresa = await obtenerColeccion().findOne({
      _id: new ObjectId(id)
    });

    if (!empresa) {
      return res.status(404).json({
        mensaje: "Empresa no encontrada"
      });
    }

    res.json(empresa);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener la empresa",
      error
    });
  }
};

// POST /api/empresas
export const crearEmpresa = async (req: Request, res: Response) => {
  try {
    const {
      nombre,
      sector,
      ciudad,
      contacto,
      correo,
      telefono,
      vacantes,
      modalidad,
      estado
    } = req.body;

    if (
      !nombre ||
      !sector ||
      !ciudad ||
      !contacto ||
      !correo ||
      !telefono ||
      vacantes === undefined ||
      !modalidad ||
      !estado
    ) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios"
      });
    }

    if (!Number.isInteger(vacantes) || vacantes < 0) {
      return res.status(400).json({
        mensaje: "Vacantes debe ser un número entero mayor o igual a 0"
      });
    }

    const empresa = {
      nombre,
      sector,
      ciudad,
      contacto,
      correo,
      telefono,
      vacantes,
      modalidad,
      estado
    };

    const resultado = await obtenerColeccion().insertOne(empresa);

    res.status(201).json({
      _id: resultado.insertedId,
      ...empresa
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear la empresa",
      error
    });
  }
};

// PUT /api/empresas/:id
export const actualizarEmpresa = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const { vacantes, estado } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        mensaje: "ID de empresa no válido"
      });
    }

    const cambios: Record<string, unknown> = {};

    if (vacantes !== undefined) {
      if (!Number.isInteger(vacantes) || vacantes < 0) {
        return res.status(400).json({
          mensaje: "Vacantes debe ser un número entero mayor o igual a 0"
        });
      }

      cambios.vacantes = vacantes;
    }

    if (estado !== undefined) {
      cambios.estado = estado;
    }

    if (Object.keys(cambios).length === 0) {
      return res.status(400).json({
        mensaje: "Debes enviar vacantes o estado para actualizar"
      });
    }

    const resultado = await obtenerColeccion().updateOne(
      { _id: new ObjectId(id) },
      { $set: cambios }
    );

    if (resultado.matchedCount === 0) {
      return res.status(404).json({
        mensaje: "Empresa no encontrada"
      });
    }

    const empresaActualizada = await obtenerColeccion().findOne({
      _id: new ObjectId(id)
    });

    res.json(empresaActualizada);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la empresa",
      error
    });
  }
};

// DELETE /api/empresas/:id
export const eliminarEmpresa = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        mensaje: "ID de empresa no válido"
      });
    }

    const resultado = await obtenerColeccion().deleteOne({
      _id: new ObjectId(id)
    });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({
        mensaje: "Empresa no encontrada"
      });
    }

    res.json({
      mensaje: "Empresa eliminada correctamente"
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar la empresa",
      error
    });
  }
};

// GET /api/empresas/buscar?texto=maya
export const buscarEmpresas = async (req: Request, res: Response) => {
  try {
    const texto = String(req.query.texto || "").trim();

    if (!texto) {
      return res.status(400).json({
        mensaje: "Debes proporcionar un texto para buscar"
      });
    }

    const empresas = await obtenerColeccion()
      .find({
        nombre: {
          $regex: texto,
          $options: "i"
        }
      })
      .toArray();

    res.json(empresas);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar empresas",
      error
    });
  }
};
