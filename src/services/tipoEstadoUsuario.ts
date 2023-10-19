import { TipoEstadoUsuarioInterface } from "../interfaces/tipo.interface";
import TipoEstadoUsuario from "../models/tipoEstadoUsuario.model";

// Método para crear un nuevo TipoEstadoUsuario
const crearTipoEstadoUsuario = async (nuevoTipoEstadoUsuario: TipoEstadoUsuarioInterface) => {
  try {
    const tipoUsuarioCreado = await TipoEstadoUsuario.create(nuevoTipoEstadoUsuario);
    return tipoUsuarioCreado;
  } catch (error) {
    throw new Error("Error al crear el TipoEstadoUsuario");
  }
};

// Método para obtener todos los TiposEstadoUsuario
const obtenerTodosLosTiposEstadoUsuario = async () => {
  try {
    const tiposUsuario = await TipoEstadoUsuario.findAll();
    return tiposUsuario;
  } catch (error) {
    throw new Error("Error al obtener todos los TiposEstadoUsuario");
  }
};

// Método para obtener TipoEstadoUsuario por ID
const obtenerTipoEstadoUsuarioPorId = async (tipoUsuarioId: number) => {
  try {
    const tipoUsuario = await TipoEstadoUsuario.findByPk(tipoUsuarioId);
    if (!tipoUsuario) {
      throw new Error("TipoEstadoUsuario no encontrado");
    }
    return tipoUsuario;
  } catch (error) {
    throw new Error("Error al obtener el TipoEstadoUsuario por ID");
  }
};

// Metodo para obtener TiposEstadoUsuario filtrados
const obtenerTipoEstadoUsuarioConFiltro = async (tipoUsuarioId?: number, habilitado?: boolean) => {
  try {
    const opcionesDeFiltro: any = {};

    if (tipoUsuarioId !== undefined) {
      opcionesDeFiltro.id = tipoUsuarioId;
    }

    if (habilitado !== undefined) {
      opcionesDeFiltro.habilitado = habilitado;
    }

    const tiposUsuario = await TipoEstadoUsuario.findAll({
      where: opcionesDeFiltro,
    });

    return tiposUsuario;
  } catch (error) {
    throw new Error("Error al obtener los TiposEstadoUsuario con filtro");
  }
};

// Método para actualizar TipoEstadoUsuario por ID
const actualizarTipoEstadoUsuario = async (
  tipoUsuarioId: number,
  datosActualizados: TipoEstadoUsuarioInterface
) => {
  try {
    const tipoUsuario = await TipoEstadoUsuario.findByPk(tipoUsuarioId);
    if (!tipoUsuario) {
      throw new Error("TipoEstadoUsuario no encontrado");
    }
    await tipoUsuario.update(datosActualizados);
    return tipoUsuario;
  } catch (error) {
    throw new Error("Error al actualizar el TipoEstadoUsuario");
  }
};

// Método para eliminar TipoEstadoUsuario por ID
const eliminarTipoEstadoUsuario = async (tipoUsuarioId: number) => {
  try {
    const tipoUsuario = await TipoEstadoUsuario.findByPk(tipoUsuarioId);
    if (!tipoUsuario) {
      throw new Error("TipoEstadoUsuario no encontrado");
    }
    await tipoUsuario.destroy();
  } catch (error) {
    throw new Error("Error al eliminar el TipoEstadoUsuario");
  }
};

export {
  crearTipoEstadoUsuario,
  obtenerTodosLosTiposEstadoUsuario,
  obtenerTipoEstadoUsuarioPorId,
  obtenerTipoEstadoUsuarioConFiltro,
  actualizarTipoEstadoUsuario,
  eliminarTipoEstadoUsuario,
};
