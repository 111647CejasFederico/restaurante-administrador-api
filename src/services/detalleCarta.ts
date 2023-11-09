import { Op } from "sequelize";
import { DetalleCartaInterface } from "../interfaces/detalleCarta.interface";
import DetalleCarta from "../models/detalleCarta.model";
import Producto from "../models/producto.model";
import Carta from "../models/carta.model";
import Promocion from "../models/promocion.model";

// Obtener todos los detalles de carta
const obtenerDetallesCarta = async (): Promise<DetalleCartaInterface[]> => {
  try {
    const detallesCarta = (await DetalleCarta.findAll({
      include: [
        {
          model: Producto,
          as: "DetalleCartaProducto",
        },
        {
          model: Promocion,
          as: "DetalleCartaPromocion",
        },
      ],
    })) as DetalleCartaInterface[] | [];
    return detallesCarta;
  } catch (error) {
    throw new Error("Error al obtener detalles de carta");
  }
};

// Obtener un detalle de carta por su ID
const obtenerDetalleCartaPorId = async (
  detalleCartaId: number
): Promise<DetalleCartaInterface | null> => {
  try {
    const detalleCarta: DetalleCartaInterface | null = (await DetalleCarta.findByPk(
      detalleCartaId,
      {
        include: [
          {
            model: Producto,
            as: "DetalleCartaProducto",
          },
          {
            model: Promocion,
            as: "DetalleCartaPromocion",
          },
        ],
      }
    )) as DetalleCartaInterface | null;
    return detalleCarta;
  } catch (error) {
    throw new Error("Error al obtener el detalle de carta por ID");
  }
};

const obtenerDetallesCartaConFiltros = async (
  cartaId: number | null,
  productoId: number | null,
  promocionId: number | null,
  cantidadDisponible: number | null
): Promise<DetalleCartaInterface[]> => {
  try {
    const condiciones: any = {};
    if (cartaId !== null) {
      condiciones.carta = cartaId;
    }
    if (productoId !== null) {
      condiciones.producto = productoId;
    }
    if (promocionId !== null) {
      condiciones.promocion = promocionId;
    }
    if (cantidadDisponible !== null) {
      condiciones.cantidadDisponible = cantidadDisponible;
    }

    const detallesCarta: DetalleCartaInterface[] | null = (await DetalleCarta.findAll({
      where: condiciones,
      include: [
        {
          model: Producto,
          as: "DetalleCartaProducto",
        },
        {
          model: Promocion,
          as: "DetalleCartaPromocion",
        },
      ],
    })) as DetalleCartaInterface[];

    return detallesCarta;
  } catch (error) {
    throw new Error("Error al obtener detalles de carta con filtros");
  }
};

// Crear un nuevo detalle de carta
const crearDetalleCarta = async (
  nuevoDetalleCarta: DetalleCartaInterface
): Promise<DetalleCartaInterface> => {
  try {
    const detalleCartaCreado: DetalleCartaInterface = await DetalleCarta.create(nuevoDetalleCarta);
    return detalleCartaCreado;
  } catch (error) {
    throw new Error("Error al crear el detalle de carta");
  }
};

// Actualizar un detalle de carta por su ID
const actualizarDetalleCarta = async (
  datosActualizados: DetalleCartaInterface
): Promise<number> => {
  try {
    const resultado: [number] = await DetalleCarta.update(datosActualizados, {
      where: { id: datosActualizados.id },
    });
    return resultado[0];
  } catch (error) {
    throw new Error("Error al actualizar el detalle de carta");
  }
};

// Eliminar un detalle de carta por su ID
const eliminarDetalleCarta = async (detalleCartaId: number): Promise<number> => {
  try {
    const resultado: number = await DetalleCarta.destroy({
      where: { id: detalleCartaId },
    });
    return resultado;
  } catch (error) {
    throw new Error("Error al eliminar el detalle de carta");
  }
};

export {
  obtenerDetallesCarta,
  obtenerDetalleCartaPorId,
  obtenerDetallesCartaConFiltros,
  crearDetalleCarta,
  actualizarDetalleCarta,
  eliminarDetalleCarta,
};
