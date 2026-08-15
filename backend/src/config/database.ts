import { MongoClient, Db } from "mongodb";

let db: Db;

export const conectarDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("La variable MONGO_URI no está definida en el .env");
    }

    const cliente = new MongoClient(uri);

    await cliente.connect();

    db = cliente.db("estadias_db");

    console.log("✅ MongoDB conectado correctamente");
    console.log("📦 Base de datos: estadias_db");
  } catch (error) {
    console.error("❌ Error de conexión a MongoDB:", error);
    process.exit(1);
  }
};

export const obtenerDB = (): Db => {
  if (!db) {
    throw new Error("La base de datos todavía no está conectada");
  }

  return db;
};
