// mesaController.ts
import { Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { MesaInterface } from "../interfaces/mesa.interface";
import { RequestExt } from "../interfaces/request.interface";
import {
  actualizarMesa,
  crearMesa,
  intercambiarMesas,
  obtenerMesaPorId,
  obtenerMesas,
  obtenerMesasConFiltros,
} from "../services/mesa";

const getMesas = async (req: RequestExt, res: Response) => {
  try {
    const mesas: MesaInterface[] | null = await obtenerMesas();
    res.status(200).json(mesas);
  } catch (e) {
    handleHttp(res, "Error_getMesas");
  }
};

const getMesaByID = async (req: RequestExt, res: Response) => {
  try {
    const { params } = req;
    const mesaId: number = parseInt(params.id);
    const mesa: MesaInterface | null = await obtenerMesaPorId(mesaId);
    res.status(200).send(mesa);
  } catch (e) {
    handleHttp(res, "Error_getMesa");
  }
};

const getMesasFiltradas = async (req: RequestExt, res: Response) => {
  try {
    const { ubicacion, estado } = req.query;
    const mesas: MesaInterface[] | null = await obtenerMesasConFiltros(
      ubicacion !== undefined ? Number(ubicacion) : null,
      estado !== undefined ? Number(estado) : null
    );
    res.status(200).send(mesas);
  } catch (e) {
    handleHttp(res, "Error_getMesa");
  }
};

const postMesa = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const nuevaMesa: MesaInterface = body;
    const mesaCreada = await crearMesa(nuevaMesa);
    res.status(201).json(mesaCreada);
  } catch (e) {
    handleHttp(res, "Error_postMesa");
  }
};

const putMesa = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const datosActualizados: MesaInterface = body;
    const responseMesa = await actualizarMesa(datosActualizados);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_putMesa");
  }
};

const intercambiarUbicaciones = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const mesaId1: number = body.mesaId1;
    const mesaId2: number = body.mesaId2;
    await intercambiarMesas(mesaId1, mesaId2);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_intercambiarUbicaciones");
  }
};

export { getMesas, getMesaByID, getMesasFiltradas, postMesa, putMesa, intercambiarUbicaciones };
