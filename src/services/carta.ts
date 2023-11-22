import Carta from "../models/carta.model";
import { CartaInterface } from "../interfaces/carta.interface";
import DetalleCarta from "../models/detalleCarta.model";
import { Op } from "sequelize";
import Promocion from "../models/promocion.model";
import Producto from "../models/producto.model";
import TipoProducto from "../models/tipoProducto.model";

const obtenerCartas = async (): Promise<CartaInterface[] | null> => {
  try {
    const cartas: CartaInterface[] | null = await Carta.findAll({
      include: {
        model: DetalleCarta,
        as: "DetallesCarta",
        include: [
          {
            model: Promocion,
            as: "DetalleCartaPromocion",
            attributes: ["nombre", "descripcion", "precio", "estado"],
          },
          {
            model: Producto,
            as: "DetalleCartaProducto",
            attributes: ["nombre", "tipo", "precio", "habilitado"],

            include: [
              {
                model: TipoProducto,
                as: "TipoProducto",
                attributes: ["nombre", "habilitado"],
              },
            ],
            // attributes: ["id", "nombre"],
          },
        ],
      },
    });
    return cartas;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las cartas");
  }
};

const obtenerCartaPorId = async (cartaId: number): Promise<CartaInterface | null> => {
  try {
    const carta: CartaInterface | null = await Carta.findByPk(cartaId, {
      include: {
        model: DetalleCarta,
        as: "DetallesCarta",
        include: [
          {
            model: Promocion,
            as: "DetalleCartaPromocion",
            attributes: ["nombre", "descripcion", "precio", "estado"],
          },
          {
            model: Producto,
            as: "DetalleCartaProducto",
            attributes: ["nombre", "tipo", "precio", "habilitado"],

            include: [
              {
                model: TipoProducto,
                as: "TipoProducto",
                attributes: ["nombre", "habilitado"],
              },
            ],
            // attributes: ["id", "nombre"],
          },
        ],
      },
    });
    return carta;
  } catch (error) {
    throw new Error("Error al obtener la carta por ID");
  }
};

const obtenerCartasHabilitadas = async (): Promise<CartaInterface[] | null> => {
  try {
    const cartasHabilitadas: CartaInterface[] | null = await Carta.findAll({
      where: {
        habilitado: true,
        fechaInicioValidez: { [Op.lte]: new Date() },
        fechaFinValidez: { [Op.gte]: new Date() },
      },
      include: {
        model: DetalleCarta,
        as: "DetallesCarta",
        include: [
          {
            model: Promocion,
            as: "DetalleCartaPromocion",
            attributes: ["nombre", "descripcion", "precio", "estado"],
          },
          {
            model: Producto,
            as: "DetalleCartaProducto",
            attributes: ["nombre", "tipo", "precio", "habilitado"],

            include: [
              {
                model: TipoProducto,
                as: "TipoProducto",
                attributes: ["nombre", "habilitado"],
              },
            ],
            // attributes: ["id", "nombre"],
          },
        ],
      },
    });
    return cartasHabilitadas;
  } catch (error) {
    throw new Error("Error al obtener las cartas habilitadas");
  }
};

const crearCarta = async (nuevaCarta: CartaInterface): Promise<CartaInterface> => {
  try {
    const cartaCreada: CartaInterface = await Carta.create(nuevaCarta);
    return cartaCreada;
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear la carta");
  }
};

const actualizarCarta = async (datosActualizados: CartaInterface): Promise<number> => {
  try {
    const resultado: [number] = await Carta.update(datosActualizados, {
      where: { id: datosActualizados.id },
    });
    return resultado[0];
  } catch (error) {
    throw new Error("Error al actualizar la carta");
  }
};

const eliminarCarta = async (cartaId: number): Promise<number> => {
  try {
    const resultado: number = await Carta.destroy({
      where: { id: cartaId },
    });
    return resultado;
  } catch (error) {
    throw new Error("Error al eliminar la carta");
  }
};

export {
  obtenerCartas,
  obtenerCartaPorId,
  obtenerCartasHabilitadas,
  crearCarta,
  actualizarCarta,
  eliminarCarta,
};
