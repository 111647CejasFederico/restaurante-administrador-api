import { TipoEstadoMesaInterface } from "../interfaces/tipo.interface";
import TipoEstadoMesa from "../models/tipoEstadoMesa.model";

// Método para crear un nuevo TipoEstadoMesa
const crearTipoEstadoMesa = async (nuevoTipoEstadoMesa: TipoEstadoMesaInterface) => {
  try {
    const tipoMesaCreado = await TipoEstadoMesa.create({ ...nuevoTipoEstadoMesa, id: 0 });
    return tipoMesaCreado;
  } catch (error) {
    throw new Error("Error al crear el TipoEstadoMesa");
  }
};

// Método para obtener todos los TiposEstadoUsuario
const obtenerTodosLosTiposEstadoUsuario = async () => {
  try {
    const tiposMesa = await TipoEstadoMesa.findAll();
    return tiposMesa;
  } catch (error) {
    throw new Error("Error al obtener todos los TiposEstadoUsuario");
  }
};

// Método para obtener TipoEstadoMesapor ID
const obtenerTipoEstadoMesaPorId = async (tipoMesaId: number) => {
  try {
    const tipoMesa = await TipoEstadoMesa.findByPk(tipoMesaId);
    if (!tipoMesa) {
      throw new Error("TipoEstadoMesano encontrado");
    }
    return tipoMesa;
  } catch (error) {
    throw new Error("Error al obtener el TipoEstadoMesa por ID");
  }
};

// Metodo para obtener TiposEstadoUsuario filtrados
const obtenerTipoEstadoMesaConFiltro = async (
  tipoMesaId: number | null,
  habilitado: boolean | null
) => {
  try {
    const opcionesDeFiltro: any = {};

    if (tipoMesaId !== null) {
      opcionesDeFiltro.id = tipoMesaId;
    }
    if (habilitado !== null) {
      opcionesDeFiltro.habilitado = habilitado;
    }

    const tiposMesa = await TipoEstadoMesa.findAll({
      where: opcionesDeFiltro,
    });

    return tiposMesa;
  } catch (error) {
    throw new Error("Error al obtener los TiposEstadoUsuario con filtro");
  }
};

// Método para actualizar TipoEstadoMesapor ID
const actualizarTipoEstadoMesa = async (datosActualizados: TipoEstadoMesaInterface) => {
  try {
    const tipoMesa = await TipoEstadoMesa.update(datosActualizados, {
      where: { id: datosActualizados.id },
    });
    return tipoMesa[0];
  } catch (error) {
    throw new Error("Error al actualizar el TipoEstadoMesa");
  }
};

// Método para eliminar TipoEstadoMesapor ID
const eliminarTipoEstadoMesa = async (tipoMesaId: number) => {
  try {
    const tipoMesa = await TipoEstadoMesa.findByPk(tipoMesaId);
    if (!tipoMesa) {
      throw new Error("TipoEstadoMesano encontrado");
    }
    await tipoMesa.destroy();
  } catch (error) {
    throw new Error("Error al eliminar el TipoEstadoMesa");
  }
};

export {
  crearTipoEstadoMesa,
  obtenerTodosLosTiposEstadoUsuario,
  obtenerTipoEstadoMesaPorId,
  obtenerTipoEstadoMesaConFiltro,
  actualizarTipoEstadoMesa,
  eliminarTipoEstadoMesa,
};
