import { Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { TipoEstadoMesaInterface } from "../interfaces/tipo.interface";
import {
  actualizarTipoEstadoMesa,
  crearTipoEstadoMesa,
  eliminarTipoEstadoMesa,
  obtenerTipoEstadoMesaConFiltro,
} from "../services/tipoEstadoMesa";
import { RequestExt } from "../interfaces/request.interface";

const getTipoEstadoMesasFiltrados = async (req: RequestExt, res: Response) => {
  try {
    const { tipo, habilitado } = req.query;
    const tipoEstadoMesas: TipoEstadoMesaInterface[] = await obtenerTipoEstadoMesaConFiltro(
      tipo !== undefined ? Number(tipo) : null,
      habilitado !== undefined ? Boolean(habilitado) : null
    );
    res.status(200).send(tipoEstadoMesas);
  } catch (e) {
    handleHttp(res, "Error_getTipoEstadoMesa");
  }
};

const postTipoEstadoMesa = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const nuevaTipoEstadoMesa: TipoEstadoMesaInterface = body;
    const responseTipoEstadoMesa = await crearTipoEstadoMesa(nuevaTipoEstadoMesa);
    res.status(201).send(responseTipoEstadoMesa);
  } catch (e) {
    handleHttp(res, "Error_postTipoEstadoMesa");
  }
};

const putTipoEstadoMesa = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const datosActualizados: TipoEstadoMesaInterface = body;
    const responseTipoEstadoMesa = await actualizarTipoEstadoMesa(datosActualizados);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_putTipoEstadoMesa");
  }
};

const deleteTipoEstadoMesa = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const tipoEstadoMesaId: number = body.id;
    const responseTipoEstadoMesa = await eliminarTipoEstadoMesa(tipoEstadoMesaId);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_deleteTipoEstadoMesa");
  }
};

export { getTipoEstadoMesasFiltrados, postTipoEstadoMesa, putTipoEstadoMesa, deleteTipoEstadoMesa };
