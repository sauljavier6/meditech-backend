import { Request, Response } from "express";
import Batch from "../models/Batch";
import User from "../models/User";

// POST - Crear nuevo lote
export const postBatch = async (req: any, res: any) => {
  try {
    const { operador, lote, fecha } = req.body;

    if (!lote || !operador || !fecha) {
      return res.status(400).json({ message: "Lote, fecha e ID_User son obligatorios." });
    }

    const newBatch = await Batch.create({
      Lote: lote,
      ID_User: operador,
      Date: fecha,
      State: true,
    });

    res.status(201).json({
      message: "Lote creado exitosamente",
      data: newBatch,
    });
  } catch (error) {
    console.error("Error al crear el lote:", error);
    res.status(500).json({
      message: "Error al crear el lote",
      error,
    });
  }
};

// GET - Obtener todos los lotes con usuario relacionado
export const getBatch = async (_req: Request, res: Response) => {
  try {
    const batches = await Batch.findAll({
      include: [
        {
          model: User,
          attributes: ["ID_User", "Name"],
        },
      ],
    });

    res.status(200).json(batches);
  } catch (error) {
    console.error("Error al obtener los lotes:", error);
    res.status(500).json({
      message: "Error al obtener los lotes",
      error,
    });
  }
};
