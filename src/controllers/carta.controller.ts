import { Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { CartaInterface } from "../interfaces/carta.interface";
import {
  obtenerCartas,
  obtenerCartaPorId,
  crearCarta,
  actualizarCarta,
  eliminarCarta,
  obtenerCartasHabilitadas,
} from "../services/carta";
import { RequestExt } from "../interfaces/request.interface";

const getCartas = async (req: RequestExt, res: Response) => {
  try {
    const cartas: CartaInterface[] | null = await obtenerCartas();
    res.status(200).json(cartas);
  } catch (e) {
    handleHttp(res, "Error_getCartas");
  }
};

const getCartaByID = async (req: RequestExt, res: Response) => {
  try {
    const { params } = req;
    const cartaId: number = parseInt(params.id);
    const carta: CartaInterface | null = await obtenerCartaPorId(cartaId);
    res.status(200).send(carta);
  } catch (e) {
    handleHttp(res, "Error_getCarta");
  }
};

const getCartasHabilitadas = async (req: RequestExt, res: Response) => {
  try {
    const cartasHabilitadas: CartaInterface[] | null = await obtenerCartasHabilitadas();
    res.status(200).json(cartasHabilitadas);
  } catch (e) {
    handleHttp(res, "Error_getCartasHabilitadas");
  }
};

const postCarta = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const nuevaCarta: CartaInterface = body;
    const responseCarta = await crearCarta(nuevaCarta);
    res.status(201).json(responseCarta);
  } catch (e) {
    handleHttp(res, "Error_postCarta");
  }
};

const putCarta = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const datosActualizados: CartaInterface = body;
    const responseCarta = await actualizarCarta(datosActualizados);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_putCarta");
  }
};

const deleteCarta = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const cartaId: number = body.id;
    const responseCarta = await eliminarCarta(cartaId);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_deleteCarta");
  }
};

export { getCartas, getCartaByID, getCartasHabilitadas, postCarta, putCarta, deleteCarta };
