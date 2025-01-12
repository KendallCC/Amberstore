import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Obtener todas los Categorias
export const getCategorias = async (req: Request, res: Response) => {
  try {
    const Categorias = await prisma.categoria.findMany();
    res.json(Categorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorias', error });
  }
};

export const createCategoria = async (req: Request, res: Response) => {
    try{
    const { nombre, descripcion } = req.body;
    const categoria = await prisma.categoria.create({
        data: { nombre, descripcion },
    });
    res.json(categoria);
} catch(error){
    res.status(500).json({ message: 'Error al crear la categoria', error });
}
};

// Actualizar una categoría
export const updateCategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // ID de la categoría a actualizar
    const { nombre, descripcion } = req.body;

    const categoria = await prisma.categoria.update({
      where: { id: parseInt(id) }, // Convertir el ID a número
      data: { nombre, descripcion },
    });

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la categoría', error });
  }
};

// Eliminar una categoría
export const deleteCategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // ID de la categoría a eliminar

    await prisma.categoria.delete({
      where: { id: parseInt(id) }, // Convertir el ID a número
    });

    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la categoría', error });
  }
};



