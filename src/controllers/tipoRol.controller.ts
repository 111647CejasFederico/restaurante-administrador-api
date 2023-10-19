import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { TipoRolInterface } from "../interfaces/tipo.interface";
import {
  obtenerTodosLosTiposRol,
  obtenerTipoRolConFiltro,
  crearTipoRol,
  actualizarTipoRol,
  eliminarTipoRol,
} from "../services/tipoRol";

const getTipoRols = async (req: Request, res: Response) => {
  try {
    const tipoRols: TipoRolInterface[] = await obtenerTodosLosTiposRol();
    res.status(200).json(tipoRols);
  } catch (e) {
    handleHttp(res, "Error_getTipoRols");
  }
};

const getTipoRolsFiltradas = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { tipo, habilitado } = body;
    const tipoRols: TipoRolInterface[] = await obtenerTipoRolConFiltro(tipo, habilitado);
    res.status(200).send(tipoRols);
  } catch (e) {
    handleHttp(res, "Error_getTipoRol");
  }
};

const postTipoRol = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const nuevaTipoRol: TipoRolInterface = body;
    const responseTipoRol = await crearTipoRol(nuevaTipoRol);
    res.status(201).send(responseTipoRol);
  } catch (e) {
    handleHttp(res, "Error_postTipoRol");
  }
};

const putTipoRol = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const tipoRolId: number = body.id;
    const datosActualizados: TipoRolInterface = body;
    const responseTipoRol = await actualizarTipoRol(tipoRolId, datosActualizados);
    res.status(204).send(responseTipoRol);
  } catch (e) {
    handleHttp(res, "Error_putTipoRol");
  }
};

const deleteTipoRol = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const tipoRolId: number = body.id;
    const responseTipoRol = await eliminarTipoRol(tipoRolId);
    res.status(204).send(responseTipoRol);
  } catch (e) {
    handleHttp(res, "Error_deleteTipoRol");
  }
};

export { getTipoRols, getTipoRolsFiltradas, postTipoRol, putTipoRol, deleteTipoRol };
