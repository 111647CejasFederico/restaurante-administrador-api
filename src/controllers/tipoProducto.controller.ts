import { Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { TipoProductoInterface } from "../interfaces/tipo.interface";
import {
  actualizarTipoProducto,
  crearTipoProducto,
  eliminarTipoProducto,
  obtenerTipoProductoConFiltro,
  obtenerTodosLosTiposProducto,
} from "../services/tipoProducto";
import { RequestExt } from "../interfaces/request.interface";

const getTipoProductos = async (req: RequestExt, res: Response) => {
  try {
    const tipoProductos: TipoProductoInterface[] = await obtenerTodosLosTiposProducto();
    res.status(200).json(tipoProductos);
  } catch (e) {
    handleHttp(res, "Error_getTipoProductos");
  }
};

const getTipoProductosFiltradas = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const { tipo, habilitado } = body;
    const tipoProductos: TipoProductoInterface[] = await obtenerTipoProductoConFiltro(
      tipo,
      habilitado
    );
    res.status(200).send(tipoProductos);
  } catch (e) {
    handleHttp(res, "Error_getTipoProducto");
  }
};

const postTipoProducto = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const nuevaTipoProducto: TipoProductoInterface = body;
    const responseTipoProducto = await crearTipoProducto(nuevaTipoProducto);
    res.status(201).send(responseTipoProducto);
  } catch (e) {
    console.log(e);
    handleHttp(res, "Error_postTipoProducto");
  }
};

const putTipoProducto = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const tipoProductoId: number = body.id;
    const datosActualizados: TipoProductoInterface = body;
    const responseTipoProducto = await actualizarTipoProducto(tipoProductoId, datosActualizados);
    res.status(204).send(responseTipoProducto);
  } catch (e) {
    handleHttp(res, "Error_putTipoProducto");
  }
};

const deleteTipoProducto = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const tipoProductoId: number = body.id;
    const responseTipoProducto = await eliminarTipoProducto(tipoProductoId);
    res.status(204).send(responseTipoProducto);
  } catch (e) {
    handleHttp(res, "Error_deleteTipoProducto");
  }
};

export {
  getTipoProductos,
  getTipoProductosFiltradas,
  postTipoProducto,
  putTipoProducto,
  deleteTipoProducto,
};
