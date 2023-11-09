import { Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { RequestExt } from "../interfaces/request.interface";
import { UbicacionInterface } from "../interfaces/ubicacion.interface";
import {
  actualizarUbicacion,
  obtenerUbicacionPorId,
  obtenerUbicaciones,
  obtenerUbicacionesConFiltros,
} from "../services/ubicacion";

const getUbicaciones = async (req: RequestExt, res: Response) => {
  try {
    const ubicaciones: UbicacionInterface[] | null = await obtenerUbicaciones();
    res.status(200).json(ubicaciones);
  } catch (e) {
    handleHttp(res, "Error_getUbicaciones");
  }
};

const getUbicacionesConFiltros = async (req: RequestExt, res: Response) => {
  try {
    const { nombre, habilitado, disponible } = req.query;

    const ubicaciones: UbicacionInterface[] | null = await obtenerUbicacionesConFiltros(
      nombre !== undefined ? String(nombre) : null,
      habilitado !== undefined ? Boolean(habilitado) : null,
      disponible !== undefined ? Boolean(disponible) : null
    );

    res.status(200).json(ubicaciones);
  } catch (e) {
    handleHttp(res, "Error_getUbicaciones");
  }
};

const getUbicacionByID = async (req: RequestExt, res: Response) => {
  try {
    const { params } = req;
    const ubicacionId: number = parseInt(params.id);
    const ubicacion: UbicacionInterface | null = await obtenerUbicacionPorId(ubicacionId);
    res.status(200).send(ubicacion);
  } catch (e) {
    handleHttp(res, "Error_getUbicacion");
  }
};

const putUbicacion = async (req: RequestExt, res: Response) => {
  try {
    const { params, body } = req;
    const ubicacionId: number = parseInt(params.id);
    const datosActualizados: UbicacionInterface = body;
    const responseUbicacion = await actualizarUbicacion(ubicacionId, datosActualizados);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_putUbicacion");
  }
};

export { getUbicaciones, getUbicacionesConFiltros, getUbicacionByID, putUbicacion };
