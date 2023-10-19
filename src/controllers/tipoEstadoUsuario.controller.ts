import { Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { TipoEstadoUsuarioInterface } from "../interfaces/tipo.interface";
import {
  actualizarTipoEstadoUsuario,
  crearTipoEstadoUsuario,
  eliminarTipoEstadoUsuario,
  obtenerTipoEstadoUsuarioConFiltro,
  obtenerTodosLosTiposEstadoUsuario,
} from "../services/tipoEstadoUsuario";
import { RequestExt } from "../interfaces/request.interface";

const getTipoEstadoUsuarios = async (req: RequestExt, res: Response) => {
  try {
    const tipoEstadoUsuarios: TipoEstadoUsuarioInterface[] =
      await obtenerTodosLosTiposEstadoUsuario();
    res.status(200).json(tipoEstadoUsuarios);
  } catch (e) {
    handleHttp(res, "Error_getTipoEstadoUsuarios");
  }
};

const getTipoEstadoUsuariosFiltrados = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const { tipo, habilitado } = body;
    const tipoEstadoUsuarios: TipoEstadoUsuarioInterface[] =
      await obtenerTipoEstadoUsuarioConFiltro(tipo, habilitado);
    res.status(200).send(tipoEstadoUsuarios);
  } catch (e) {
    handleHttp(res, "Error_getTipoEstadoUsuario");
  }
};

const postTipoEstadoUsuario = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const nuevaTipoEstadoUsuario: TipoEstadoUsuarioInterface = body;
    const responseTipoEstadoUsuario = await crearTipoEstadoUsuario(nuevaTipoEstadoUsuario);
    res.status(201).send(responseTipoEstadoUsuario);
  } catch (e) {
    handleHttp(res, "Error_postTipoEstadoUsuario");
  }
};

const putTipoEstadoUsuario = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const tipoEstadoUsuarioId: number = body.id;
    const datosActualizados: TipoEstadoUsuarioInterface = body;
    const responseTipoEstadoUsuario = await actualizarTipoEstadoUsuario(
      tipoEstadoUsuarioId,
      datosActualizados
    );
    res.status(204).send(responseTipoEstadoUsuario);
  } catch (e) {
    handleHttp(res, "Error_putTipoEstadoUsuario");
  }
};

const deleteTipoEstadoUsuario = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const tipoEstadoUsuarioId: number = body.id;
    const responseTipoEstadoUsuario = await eliminarTipoEstadoUsuario(tipoEstadoUsuarioId);
    res.status(204).send(responseTipoEstadoUsuario);
  } catch (e) {
    handleHttp(res, "Error_deleteTipoEstadoUsuario");
  }
};

export {
  getTipoEstadoUsuarios,
  getTipoEstadoUsuariosFiltrados,
  postTipoEstadoUsuario,
  putTipoEstadoUsuario,
  deleteTipoEstadoUsuario,
};
