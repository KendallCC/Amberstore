import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getImagenes = async (req: Request, res: Response) => {
    const imagenes = await prisma.imagen.findMany();
    res.json(imagenes);
};

export const createImagen = async (req: Request, res: Response) => {
    const { urlImagen, productoId } = req.body;
    const imagen = await prisma.imagen.create({
        data: { urlImagen, productoId },
    });
    res.json(imagen);
};