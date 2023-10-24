import { Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { RequestExt } from "../interfaces/request.interface";
import { PromocionInterface } from "../interfaces/promocion.interface";
import {
  actualizarPromocion,
  crearPromocion,
  eliminarPromocion,
  habilitarDeshabilitarPromocion,
  obtenerPromocionPorId,
  obtenerPromociones,
  obtenerPromocionesConFiltros,
} from "../services/promocion";

const getPromociones = async (req: RequestExt, res: Response) => {
  try {
    const promociones: PromocionInterface[] = await obtenerPromociones();
    res.status(200).json(promociones);
  } catch (e) {
    console.log(e);
    handleHttp(res, "Error_getPromociones");
  }
};

const getPromocionByID = async (req: RequestExt, res: Response) => {
  try {
    const { params } = req;
    const promocionId: number = parseInt(params.id);
    const promocion: PromocionInterface | null = await obtenerPromocionPorId(promocionId);
    res.status(200).send(promocion);
  } catch (e) {
    handleHttp(res, "Error_getPromocion");
  }
};

const getPromocionesFiltradas = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const { estado, nombre } = body;
    const promociones: PromocionInterface[] = await obtenerPromocionesConFiltros(
      estado !== undefined ? Number(estado) : null,
      nombre !== undefined ? String(nombre) : null
    );
    res.status(200).send(promociones);
  } catch (e) {
    handleHttp(res, "Error_getPromocion");
  }
};

const postPromocion = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const nuevaPromocion: PromocionInterface = body;
    const responsePromocion = await crearPromocion(nuevaPromocion);
    res.status(201).send(responsePromocion);
  } catch (e) {
    handleHttp(res, "Error_postPromocion");
  }
};

const putPromocion = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const promocionId: number = body.id;
    const datosActualizados: PromocionInterface = body;
    const responsePromocion = await actualizarPromocion(promocionId, datosActualizados);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_putPromocion");
  }
};

const putHabilitarDeshabilitarPromocion = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const promocionId: number = body.id;
    const estado: number = body.estado;
    const responsePromocion = await habilitarDeshabilitarPromocion(promocionId, estado);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_putPromocion");
  }
};

const deletePromocion = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const promocionId: number = body.id;
    const responsePromocion = await eliminarPromocion(promocionId);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_deletePromocion");
  }
};

export {
  getPromociones,
  getPromocionByID,
  getPromocionesFiltradas,
  postPromocion,
  putPromocion,
  putHabilitarDeshabilitarPromocion,
  deletePromocion,
};
