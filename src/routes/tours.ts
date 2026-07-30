import { Router, Request, Response } from 'express';
import Tour from '../models/Tour';

const router = Router();

// Obtener todos los tours
router.get('/', async (req: Request, res: Response) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tours', error });
  }
});

// Crear un tour (opcional para la práctica)
router.post('/', async (req: Request, res: Response) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();
    res.json(savedTour);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear tour', error });
  }
});

export default router;