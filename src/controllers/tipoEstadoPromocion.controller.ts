import { Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { TipoEstadoPromocionInterface } from "../interfaces/tipo.interface";
import {
  actualizarTipoEstadoPromocion,
  crearTipoEstadoPromocion,
  eliminarTipoEstadoPromocion,
  obtenerTipoEstadoPromocionConFiltro,
  obtenerTodosLosTiposEstadoPromocion,
} from "../services/tipoEstadoPromocion";
import { RequestExt } from "../interfaces/request.interface";

const getTipoEstadoPromocions = async (req: RequestExt, res: Response) => {
  try {
    const tipoEstadoPromocions: TipoEstadoPromocionInterface[] =
      await obtenerTodosLosTiposEstadoPromocion();
    res.status(200).json(tipoEstadoPromocions);
  } catch (e) {
    handleHttp(res, "Error_getTipoEstadoPromocions");
  }
};

const getTipoEstadoPromocionsFiltrados = async (req: RequestExt, res: Response) => {
  try {
    const { tipo, habilitado } = req.query;
    const tipoEstadoPromocions: TipoEstadoPromocionInterface[] =
      await obtenerTipoEstadoPromocionConFiltro(
        tipo !== undefined ? Number(tipo) : null,
        habilitado !== undefined ? Boolean(habilitado) : null
      );
    res.status(200).send(tipoEstadoPromocions);
  } catch (e) {
    handleHttp(res, "Error_getTipoEstadoPromocion");
  }
};

const postTipoEstadoPromocion = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const nuevaTipoEstadoPromocion: TipoEstadoPromocionInterface = body;
    const responseTipoEstadoPromocion = await crearTipoEstadoPromocion(nuevaTipoEstadoPromocion);
    res.status(201).send(responseTipoEstadoPromocion);
  } catch (e) {
    handleHttp(res, "Error_postTipoEstadoPromocion");
  }
};

const putTipoEstadoPromocion = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const datosActualizados: TipoEstadoPromocionInterface = body;
    const responseTipoEstadoPromocion = await actualizarTipoEstadoPromocion(datosActualizados);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_putTipoEstadoPromocion");
  }
};

const deleteTipoEstadoPromocion = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const tipoEstadoPromocionId: number = body.id;
    const responseTipoEstadoPromocion = await eliminarTipoEstadoPromocion(tipoEstadoPromocionId);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_deleteTipoEstadoPromocion");
  }
};

export {
  getTipoEstadoPromocions,
  getTipoEstadoPromocionsFiltrados,
  postTipoEstadoPromocion,
  putTipoEstadoPromocion,
  deleteTipoEstadoPromocion,
};
