import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import toursRoutes from './routes/tours';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || '';

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/tours', toursRoutes);

// Conexión a MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas: ToursDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error de conexión a MongoDB:', err);
  });