// controllers/productosController.ts
import { PrismaClient } from '@prisma/client';
import { log } from 'console';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const productos = await prisma.producto.findMany({
      include: {
        imagenes: true, // Incluye todas las imágenes asociadas al producto
        categorias: {
          include: {
            categoria: true, // Incluye los detalles de cada categoría asociada
          },
        },
      },
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
};



export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Validar que el ID es un número válido
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "El ID del producto es inválido" });
    }

    const producto = await prisma.producto.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        imagenes: true, // Incluye todas las imágenes asociadas al producto
        categorias: {
          include: {
            categoria: true, // Incluye los detalles de cada categoría asociada
          },
        },
      },
    });

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error);
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};



export const getProductsbyCategory = async (req: Request, res: Response) => {
  const { categoriaId } = req.params;

  try {
    // Validar que el ID de la categoría es un número
    if (!categoriaId || isNaN(Number(categoriaId))) {
      return res.status(400).json({ message: "El ID de la categoría es inválido" });
    }

    const productos = await prisma.producto.findMany({
      where: {
        categorias: {
          some: {
            categoriaId: parseInt(categoriaId, 10),
          },
        },
      },
      include: {
        categorias: {
          include: { categoria: true },
        },
        imagenes: true,
      },
    });

    if (productos.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos para esta categoría" });
    }

    return res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};






export const createProduct = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, precio, imagenes, categorias } = req.body;

    // Mapear las imágenes para asegurarte de que solo envías el campo `urlImagen`
    const imagenesLimpias = imagenes.map((imagen: { urlImagen: string }) => ({
      urlImagen: imagen.urlImagen,
    }));

    const producto = await prisma.producto.create({
      data: {
        nombre,
        descripcion,
        precio,
        imagenes: {
          create: imagenesLimpias, // Crear imágenes relacionadas
        },
        categorias: {
          create: categorias.map((categoria: { categoriaId: number }) => ({
            categoria: {
              connect: { id: categoria.categoriaId }, // Conectar categoría existente
            },
          })),
        },
      },
      include: {
        imagenes: true,
        categorias: true, // Incluir las relaciones en la respuesta
      },
    });

    res.json(producto);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
};














export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, imagenes, categorias } = req.body;

  try {
    // Validar que el ID es un número válido
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "El ID del producto es inválido" });
    }

    // Actualizar el producto
    // Actualizar el producto
    const productoActualizado = await prisma.producto.update({
      where: { id: parseInt(id, 10) },
      data: {
        nombre,
        descripcion,
        precio,
        imagenes: {
          deleteMany: {}, // Eliminar todas las imágenes relacionadas
          create: imagenes.map((imagen: { urlImagen: string }) => ({
            urlImagen: imagen.urlImagen, // Solo incluir campos relevantes
          })),
        },
        categorias: {
          deleteMany: {}, // Eliminar todas las categorías relacionadas
          create: categorias.map((categoria: { categoriaId: number }) => ({
            categoria: {
              connect: { id: categoria.categoriaId }, // Conectar a una categoría existente
            },
          })),
        },
      },
      include: {
        imagenes: true,
        categorias: true,
      },
    });


    res.json(productoActualizado);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Validar que el ID es un número válido
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "El ID del producto es inválido" });
    }

    // Verificar si el producto existe antes de eliminarlo
    const productoExistente = await prisma.producto.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!productoExistente) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Eliminar el producto
    await prisma.producto.delete({
      where: { id: parseInt(id, 10) },
    });

    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};
