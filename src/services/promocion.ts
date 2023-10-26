import { Op } from "sequelize";
import TipoEstadoUsuario from "../models/tipoEstadoUsuario.model";
import { PromocionInterface } from "../interfaces/promocion.interface";
import Promocion from "../models/promocion.model";
import TipoEstadoPromocion from "../models/tipoEstadoPromocion.model";

// Obtener todas las promociones
const obtenerPromociones = async (): Promise<PromocionInterface[]> => {
  try {
    const promociones = await Promocion.findAll();
    //@ts-ignore
    return promociones;
  } catch (error) {
    throw new Error("Error al obtener promociones");
  }
};

// Obtener una promocion por su ID
const obtenerPromocionPorId = async (promocionId: number): Promise<PromocionInterface | null> => {
  try {
    //@ts-ignore
    let promocion: PromocionInterface | null = await Promocion.findByPk(promocionId);
    return promocion;
  } catch (error) {
    throw new Error("Error al obtener la promocion por ID");
  }
};

const obtenerPromocionesConFiltros = async (
  estado: number | null,
  nombre: string | null
): Promise<PromocionInterface[]> => {
  try {
    const condiciones: any = {};
    if (estado !== null) {
      condiciones.estado = estado;
    }
    if (nombre !== null) {
      condiciones.nombre = { [Op.like]: `%${nombre}%` };
    }

    //@ts-ignore
    const promociones: PromocionInterface[] = await Promocion.findAll({
      where: condiciones,
      include: [
        {
          model: TipoEstadoPromocion,
          as: "EstadoPromocion",
          attributes: ["nombre", "habilitado"],
        },
      ],
    });

    return promociones;
  } catch (error) {
    throw new Error("Error al obtener promociones con filtros");
  }
};

// Crear una nueva promocion
const crearPromocion = async (nuevaPromocion: PromocionInterface): Promise<PromocionInterface> => {
  try {
    //@ts-ignore
    const promocionCreada: PromocionInterface = await Promocion.create({
      ...nuevaPromocion,
      id: 0,
    });
    return promocionCreada;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear la promocion");
  }
};

// Actualizar una promocion por su ID
const actualizarPromocion = async (datosActualizados: PromocionInterface): Promise<number> => {
  try {
    const resultado: [number] = await Promocion.update(datosActualizados, {
      where: { id: datosActualizados.id },
    });
    return resultado[0];
  } catch (error) {
    throw new Error("Error al actualizar la promocion");
  }
};

// habilito una promocion por su ID
const habilitarDeshabilitarPromocion = async (
  promocionId: number,
  estado: number
): Promise<number> => {
  try {
    const resultado: [number] = await Promocion.update(
      { estado: estado },
      {
        where: { id: promocionId },
      }
    );
    return resultado[0];
  } catch (error) {
    throw new Error("Error al actualizar la promocion");
  }
};

// Eliminar una promocion por su ID
const eliminarPromocion = async (promocionId: number): Promise<number> => {
  try {
    const resultado: number = await Promocion.destroy({
      where: { id: promocionId },
    });
    return resultado;
  } catch (error) {
    throw new Error("Error al eliminar la promocion");
  }
};

export {
  obtenerPromociones,
  obtenerPromocionPorId,
  obtenerPromocionesConFiltros,
  crearPromocion,
  actualizarPromocion,
  habilitarDeshabilitarPromocion,
  eliminarPromocion,
};
