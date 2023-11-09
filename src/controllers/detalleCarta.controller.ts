import { Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { DetalleCartaInterface } from "../interfaces/detalleCarta.interface";
import {
  actualizarDetalleCarta,
  eliminarDetalleCarta,
  obtenerDetalleCartaPorId,
  obtenerDetallesCarta,
  obtenerDetallesCartaConFiltros,
  crearDetalleCarta,
} from "../services/detalleCarta";
import { RequestExt } from "../interfaces/request.interface";

const getDetallesCarta = async (req: RequestExt, res: Response) => {
  try {
    const detallesCarta: DetalleCartaInterface[] | null = await obtenerDetallesCarta();
    res.status(200).json(detallesCarta);
  } catch (e) {
    handleHttp(res, "Error_getDetallesCarta");
  }
};

const getDetalleCartaByID = async (req: RequestExt, res: Response) => {
  try {
    const { params } = req;
    const detalleCartaId: number = parseInt(params.id);
    const detalleCarta: DetalleCartaInterface | null = await obtenerDetalleCartaPorId(
      detalleCartaId
    );
    res.status(200).send(detalleCarta);
  } catch (e) {
    handleHttp(res, "Error_getDetalleCarta");
  }
};

const getDetallesCartaFiltradas = async (req: RequestExt, res: Response) => {
  try {
    const { carta, producto, promocion, cantidadDisponible } = req.query;
    const detallesCarta: DetalleCartaInterface[] | null = await obtenerDetallesCartaConFiltros(
      carta !== undefined ? Number(carta) : null,
      producto !== undefined ? Number(producto) : null,
      promocion !== undefined ? Number(promocion) : null,
      cantidadDisponible !== undefined ? Number(cantidadDisponible) : null
    );
    res.status(200).send(detallesCarta);
  } catch (e) {
    handleHttp(res, "Error_getDetalleCarta");
  }
};

const postDetalleCarta = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const nuevoDetalleCarta: DetalleCartaInterface = body;
    const responseDetalleCarta = await crearDetalleCarta(nuevoDetalleCarta);
    res.status(201).json(responseDetalleCarta);
  } catch (e) {
    handleHttp(res, "Error_postDetalleCarta");
  }
};

const putDetalleCarta = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const datosActualizados: DetalleCartaInterface = body;
    const responseDetalleCarta = await actualizarDetalleCarta(datosActualizados);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_putDetalleCarta");
  }
};

const deleteDetalleCarta = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const detalleCartaId: number = body.id;
    const responseDetalleCarta = await eliminarDetalleCarta(detalleCartaId);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_deleteDetalleCarta");
  }
};

export {
  getDetallesCarta,
  getDetalleCartaByID,
  getDetallesCartaFiltradas,
  postDetalleCarta,
  putDetalleCarta,
  deleteDetalleCarta,
};
