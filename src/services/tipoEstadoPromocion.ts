import { TipoEstadoPromocionInterface } from "../interfaces/tipo.interface";
import TipoEstadoPromocion from "../models/tipoEstadoPromocion.model";

// Método para crear un nuevo TipoEstadoPromocion
const crearTipoEstadoPromocion = async (nuevoTipoEstadoPromocion: TipoEstadoPromocionInterface) => {
  try {
    const tipoPromocionCreado = await TipoEstadoPromocion.create({
      ...nuevoTipoEstadoPromocion,
      id: 0,
    });
    return tipoPromocionCreado;
  } catch (error) {
    throw new Error("Error al crear el TipoEstadoPromocion");
  }
};

// Método para obtener todos los TiposEstadoPromocion
const obtenerTodosLosTiposEstadoPromocion = async () => {
  try {
    const tiposPromocion = await TipoEstadoPromocion.findAll();
    return tiposPromocion;
  } catch (error) {
    throw new Error("Error al obtener todos los TiposEstadoPromocion");
  }
};

// Método para obtener TipoEstadoPromocion por ID
const obtenerTipoEstadoPromocionPorId = async (tipoPromocionId: number) => {
  try {
    const tipoPromocion = await TipoEstadoPromocion.findByPk(tipoPromocionId);
    if (!tipoPromocion) {
      throw new Error("TipoEstadoPromocion no encontrado");
    }
    return tipoPromocion;
  } catch (error) {
    throw new Error("Error al obtener el TipoEstadoPromocion por ID");
  }
};

// Metodo para obtener TiposEstadoPromocion filtrados
const obtenerTipoEstadoPromocionConFiltro = async (
  tipoPromocionId: number | null,
  habilitado: boolean | null
) => {
  try {
    const opcionesDeFiltro: any = {};

    if (tipoPromocionId !== null) {
      opcionesDeFiltro.id = tipoPromocionId;
    }
    if (habilitado !== null) {
      opcionesDeFiltro.habilitado = habilitado;
    }

    const tiposPromocion = await TipoEstadoPromocion.findAll({
      where: opcionesDeFiltro,
    });

    return tiposPromocion;
  } catch (error) {
    throw new Error("Error al obtener los TiposEstadoPromocion con filtro");
  }
};

// Método para actualizar TipoEstadoPromocion por ID
const actualizarTipoEstadoPromocion = async (datosActualizados: TipoEstadoPromocionInterface) => {
  try {
    const tipoPromocion = await TipoEstadoPromocion.update(datosActualizados, {
      where: { id: datosActualizados.id },
    });
    return tipoPromocion[0];
  } catch (error) {
    throw new Error("Error al actualizar el TipoEstadoPromocion");
  }
};

// Método para eliminar TipoEstadoPromocion por ID
const eliminarTipoEstadoPromocion = async (tipoPromocionId: number) => {
  try {
    const tipoPromocion = await TipoEstadoPromocion.findByPk(tipoPromocionId);
    if (!tipoPromocion) {
      throw new Error("TipoEstadoPromocion no encontrado");
    }
    await tipoPromocion.destroy();
  } catch (error) {
    throw new Error("Error al eliminar el TipoEstadoPromocion");
  }
};

export {
  crearTipoEstadoPromocion,
  obtenerTodosLosTiposEstadoPromocion,
  obtenerTipoEstadoPromocionPorId,
  obtenerTipoEstadoPromocionConFiltro,
  actualizarTipoEstadoPromocion,
  eliminarTipoEstadoPromocion,
};
