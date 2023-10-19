import { TipoRolInterface } from "../interfaces/tipo.interface";
import TipoRol from "../models/tipoRol.model";

// Método para crear un nuevo TipoRol
const crearTipoRol = async (nuevoTipoRol: TipoRolInterface) => {
  try {
    const tipoRolCreado = await TipoRol.create(nuevoTipoRol);
    return tipoRolCreado;
  } catch (error) {
    throw new Error("Error al crear el TipoRol");
  }
};

// Método para obtener todos los TiposRol
const obtenerTodosLosTiposRol = async () => {
  try {
    const tiposRol = await TipoRol.findAll();
    return tiposRol;
  } catch (error) {
    throw new Error("Error al obtener todos los TiposRol");
  }
};

// Metodo para obtener TiposRol filtrados
const obtenerTipoRolConFiltro = async (tipoRolId?: number, habilitado?: boolean) => {
  try {
    const opcionesDeFiltro: any = {};

    if (tipoRolId !== undefined) {
      opcionesDeFiltro.id = tipoRolId;
    }

    if (habilitado !== undefined) {
      opcionesDeFiltro.habilitado = habilitado;
    }

    const tiposRol = await TipoRol.findAll({
      where: opcionesDeFiltro,
    });

    return tiposRol;
  } catch (error) {
    throw new Error("Error al obtener los TiposRol con filtro");
  }
};

// Método para obtener TipoRol por ID
const obtenerTipoRolPorId = async (tipoRolId: number) => {
  try {
    const tipoRol = await TipoRol.findByPk(tipoRolId);
    if (!tipoRol) {
      throw new Error("TipoRol no encontrado");
    }
    return tipoRol;
  } catch (error) {
    throw new Error("Error al obtener el TipoRol por ID");
  }
};

// Método para actualizar TipoRol por ID
const actualizarTipoRol = async (tipoRolId: number, datosActualizados: TipoRolInterface) => {
  try {
    const tipoRol = await TipoRol.findByPk(tipoRolId);
    if (!tipoRol) {
      throw new Error("TipoRol no encontrado");
    }
    await tipoRol.update(datosActualizados);
    return tipoRol;
  } catch (error) {
    throw new Error("Error al actualizar el TipoRol");
  }
};

// Método para eliminar TipoRol por ID
const eliminarTipoRol = async (tipoRolId: number) => {
  try {
    const tipoRol = await TipoRol.findByPk(tipoRolId);
    if (!tipoRol) {
      throw new Error("TipoRol no encontrado");
    }
    await tipoRol.destroy();
  } catch (error) {
    throw new Error("Error al eliminar el TipoRol");
  }
};

export {
  crearTipoRol,
  obtenerTodosLosTiposRol,
  obtenerTipoRolConFiltro,
  actualizarTipoRol,
  eliminarTipoRol,
};
