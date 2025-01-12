import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getProductCategory = async (req: Request, res: Response) => {
    const relaciones = await prisma.productoCategoria.findMany();
    res.json(relaciones);
};

export const createProductCategory = async (req: Request, res: Response) => {
    const { productoId, categoriaId } = req.body;
    const relacion = await prisma.productoCategoria.create({
        data: { productoId, categoriaId },
    });
    res.json(relacion);
};