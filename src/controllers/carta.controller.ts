import { Response, json } from "express";
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
import { actualizarDetalleCarta, crearDetalleCarta } from "../services/detalleCarta";
import { DetalleCartaInterface } from "../interfaces/detalleCarta.interface";

const getCartas = async (req: RequestExt, res: Response) => {
  try {
    const cartas: CartaInterface[] | null = await obtenerCartas();
    res.status(200).json(cartas);
  } catch (e) {
    console.log(e);
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
  let cartaCreada: CartaInterface = {
    id: 0,
    nombre: "",
    descripcion: "",
    habilitado: true,
    fechaInicioValidez: new Date().toString(),
    fechaFinValidez: new Date().toString(),
    DetallesCarta: [],
  };
  try {
    const { body } = req;
    const nuevaCarta: CartaInterface = body;
    cartaCreada = await crearCarta(nuevaCarta);
    if (cartaCreada && nuevaCarta.DetallesCarta) {
      const detallesCartaCreada: DetalleCartaInterface[] = [];
      nuevaCarta.DetallesCarta.map((detalle) => {
        detallesCartaCreada.push({
          ...detalle,
          carta: cartaCreada.id,
          producto: detalle.producto === 0 ? null : detalle.producto,
          promocion: detalle.promocion === 0 ? null : detalle.promocion,
        });
      });
      const detallesCreados = await Promise.all(
        detallesCartaCreada.map(async (detalle) => {
          return await crearDetalleCarta(detalle);
        })
      );
      detallesCreados.map((detalleCreado) => cartaCreada.DetallesCarta?.push(detalleCreado));
    } else {
      throw new Error("Error al crear la carta");
    }
    res.status(201).send(cartaCreada);
  } catch (e) {
    console.error(e);
    handleHttp(res, "Error_postCarta");
  }
};

const putCarta = async (req: RequestExt, res: Response) => {
  let detalles: DetalleCartaInterface[] = [];
  try {
    const { body } = req;
    const datosActualizados: CartaInterface = body;
    await actualizarCarta(datosActualizados);
    if (datosActualizados.DetallesCarta) {
      datosActualizados.DetallesCarta.map((detalle) => {
        detalles.push({
          ...detalle,
          producto: detalle.producto === 0 ? null : detalle.producto,
          promocion: detalle.promocion === 0 ? null : detalle.promocion,
        });
      });
      await Promise.all(
        detalles.map(async (detalle) => {
          if (detalle.id) return await actualizarDetalleCarta(detalle);
          else return await crearDetalleCarta(detalle);
        })
      );
    }
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
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
