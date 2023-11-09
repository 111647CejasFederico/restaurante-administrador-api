import { Op } from "sequelize";
import { UbicacionInterface } from "../interfaces/ubicacion.interface";
import Ubicacion from "../models/ubicacion.model";

// Servicio para obtener todas las ubicaciones
const obtenerUbicaciones = async (): Promise<UbicacionInterface[]> => {
  try {
    const ubicaciones = await Ubicacion.findAll();
    return ubicaciones;
  } catch (error) {
    throw new Error("Error al obtener las ubicaciones");
  }
};
const obtenerUbicacionesConFiltros = async (
  nombre: string | null,
  habilitado: boolean | null,
  disponible: boolean | null
): Promise<UbicacionInterface[] | null> => {
  try {
    const condiciones: any = {};

    if (nombre !== null) {
      condiciones.nombre = { [Op.like]: `%${nombre}%` };
    }

    if (habilitado !== null) {
      condiciones.habilitado = habilitado;
    }

    if (disponible !== null) {
      condiciones.disponible = disponible;
    }

    const ubicaciones: UbicacionInterface[] | null = (await Ubicacion.findAll({
      where: condiciones,
    })) as UbicacionInterface[] | null;

    return ubicaciones;
  } catch (error) {
    throw new Error("Error al obtener ubicaciones con filtros");
  }
};

// Servicio para obtener una ubicación por su ID
const obtenerUbicacionPorId = async (ubicacionId: number): Promise<UbicacionInterface | null> => {
  try {
    const ubicacion = await Ubicacion.findByPk(ubicacionId);
    return ubicacion;
  } catch (error) {
    throw new Error("Error al obtener la ubicación por ID");
  }
};

// Servicio para actualizar una ubicación por su ID
const actualizarUbicacion = async (
  ubicacionId: number,
  datosActualizados: UbicacionInterface
): Promise<number> => {
  try {
    const resultado = await Ubicacion.update(datosActualizados, {
      where: { id: ubicacionId },
    });
    return resultado[0];
  } catch (error) {
    throw new Error("Error al actualizar la ubicación");
  }
};

export {
  obtenerUbicaciones,
  obtenerUbicacionesConFiltros,
  obtenerUbicacionPorId,
  actualizarUbicacion,
};
