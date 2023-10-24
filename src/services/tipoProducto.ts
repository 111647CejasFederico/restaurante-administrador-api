import { TipoProductoInterface } from "../interfaces/tipo.interface";
import TipoProducto from "../models/tipoProducto.model";

// Método para crear un nuevo TipoProducto
const crearTipoProducto = async (nuevoTipoProducto: TipoProductoInterface) => {
  try {
    const tipoProductoCreado = await TipoProducto.create(nuevoTipoProducto);
    return tipoProductoCreado;
  } catch (error) {
    throw new Error("Error al crear el TipoProducto");
  }
};

// Método para obtener todos los TiposProducto
const obtenerTodosLosTiposProducto = async () => {
  try {
    const tiposProducto = await TipoProducto.findAll();
    return tiposProducto;
  } catch (error) {
    throw new Error("Error al obtener todos los TiposProducto");
  }
};

// Método para obtener TipoProducto por ID
const obtenerTipoProductoPorId = async (tipoProductoId: number) => {
  try {
    const tipoProducto = await TipoProducto.findByPk(tipoProductoId);
    if (!tipoProducto) {
      throw new Error("TipoProducto no encontrado");
    }
    return tipoProducto;
  } catch (error) {
    throw new Error("Error al obtener el TipoProducto por ID");
  }
};

// Metodo para obtener TiposProducto filtrados
const obtenerTipoProductoConFiltro = async (
  tipoProductoId: number | null,
  habilitado: boolean | null
) => {
  try {
    const opcionesDeFiltro: any = {};

    if (tipoProductoId !== null) {
      opcionesDeFiltro.id = tipoProductoId;
    }
    if (habilitado !== null) {
      opcionesDeFiltro.habilitado = habilitado;
    }

    const tiposProducto = (await TipoProducto.findAll({
      where: opcionesDeFiltro,
    })) as TipoProductoInterface[];

    return tiposProducto;
  } catch (error) {
    throw new Error("Error al obtener los TiposProducto con filtro");
  }
};

// Método para actualizar TipoProducto por ID
const actualizarTipoProducto = async (datosActualizados: TipoProductoInterface) => {
  try {
    const tipoProducto = await TipoProducto.update(datosActualizados, {
      where: { id: datosActualizados.id },
    });
    return tipoProducto[0];
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar el TipoProducto");
  }
};

// Método para eliminar TipoProducto por ID
const eliminarTipoProducto = async (tipoProductoId: number) => {
  try {
    const tipoProducto = await TipoProducto.findByPk(tipoProductoId);
    if (!tipoProducto) {
      throw new Error("TipoProducto no encontrado");
    }
    await tipoProducto.destroy();
  } catch (error) {
    throw new Error("Error al eliminar el TipoProducto");
  }
};

export {
  crearTipoProducto,
  obtenerTodosLosTiposProducto,
  obtenerTipoProductoPorId,
  obtenerTipoProductoConFiltro,
  actualizarTipoProducto,
  eliminarTipoProducto,
};
