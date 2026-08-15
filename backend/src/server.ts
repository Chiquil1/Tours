import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { conectarDB } from "./config/database.js";
import empresasRoutes from "./routes/empresas.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    mensaje: "API Sistema de Registro de Empresas para Estadías Profesionales"
  });
});

// Rutas de empresas
app.use("/api/empresas", empresasRoutes);

const PORT = process.env.PORT || 3001;

const iniciarServidor = async () => {
  await conectarDB();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en puerto ${PORT}`);
  });
};

iniciarServidor();
