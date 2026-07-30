import { Request, Response } from 'express';
import Tour from '../models/Tour.js'; // ¡Importante: usar .js!

// Obtener todos los tours
export const getTours = async (req: Request, res: Response) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tours', error });
  }
};

// Obtener un tour por ID
export const getTourById = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour no encontrado' });
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el tour', error });
  }
};

// Crear un nuevo tour
export const createTour = async (req: Request, res: Response) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el tour', error });
  }
};

// Actualizar un tour
export const updateTour = async (req: Request, res: Response) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTour) {
      return res.status(404).json({ message: 'Tour no encontrado' });
    }
    res.json(updatedTour);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el tour', error });
  }
};

// Eliminar un tour
export const deleteTour = async (req: Request, res: Response) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    if (!deletedTour) {
      return res.status(404).json({ message: 'Tour no encontrado' });
    }
    res.json({ message: 'Tour eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el tour', error });
  }
};