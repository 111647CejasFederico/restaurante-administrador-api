import { Op } from "sequelize";
import { ProductoInterface } from "../interfaces/producto.interface";
import Producto from "../models/producto.model";
import TipoProducto from "../models/tipoProducto.model";

// Obtener todas las productos
const obtenerProductos = async (): Promise<ProductoInterface[]> => {
  try {
    const productos: ProductoInterface[] = await Producto.findAll();
    return productos;
  } catch (error) {
    throw new Error("Error al obtener productos");
  }
};

// Obtener una producto por su ID
const obtenerProductoPorId = async (productoId: number): Promise<ProductoInterface | null> => {
  try {
    const producto: ProductoInterface | null = await Producto.findByPk(productoId);
    return producto;
  } catch (error) {
    throw new Error("Error al obtener la producto por ID");
  }
};

// Obtener productos con filtros
const obtenerProductosConFiltros = async (
  tipo: number | null,
  habilitado: boolean | null,
  nombre: string | null
): Promise<ProductoInterface[]> => {
  try {
    const condiciones: any = {};
    if (tipo !== null) {
      condiciones.tipo = tipo;
    }
    if (habilitado !== null) {
      condiciones.habilitado = habilitado;
    }
    if (nombre !== null) {
      condiciones.nombre = { [Op.like]: `%${nombre}%` };
    }
    console.log(condiciones);
    const productos: ProductoInterface[] = await Producto.findAll({
      where: condiciones,
      include: [
        {
          model: TipoProducto,
          as: "TipoProducto",
          attributes: ["nombre", "habilitado"],
        },
      ],
    });

    return productos;
  } catch (error) {
    throw new Error("Error al obtener productos con filtros");
  }
};

// Crear una nueva producto
const crearProducto = async (nuevaProducto: ProductoInterface): Promise<ProductoInterface> => {
  try {
    const productoCreada: ProductoInterface = await Producto.create({ ...nuevaProducto, id: 0 });
    return productoCreada;
  } catch (error) {
    throw new Error("Error al crear la producto");
  }
};

// Actualizar una producto por su ID
const actualizarProducto = async (datosActualizados: ProductoInterface): Promise<number> => {
  try {
    const resultado = await Producto.update(datosActualizados, {
      where: { id: datosActualizados.id },
    });
    return resultado[0];
  } catch (error) {
    throw new Error("Error al actualizar la producto");
  }
};

// habilito una producto por su ID
const habilitarDeshabilitarProducto = async (
  productoId: number,
  habilitado: boolean
): Promise<number> => {
  try {
    const resultado: [number] = await Producto.update(
      { habilitado: habilitado },
      {
        where: { id: productoId },
      }
    );
    return resultado[0];
  } catch (error) {
    throw new Error("Error al actualizar la producto");
  }
};

// Eliminar una producto por su ID
const eliminarProducto = async (productoId: number): Promise<number> => {
  try {
    const resultado: number = await Producto.destroy({
      where: { id: productoId },
    });
    return resultado;
  } catch (error) {
    throw new Error("Error al eliminar la producto");
  }
};

export {
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductosConFiltros,
  crearProducto,
  actualizarProducto,
  habilitarDeshabilitarProducto,
  eliminarProducto,
};
