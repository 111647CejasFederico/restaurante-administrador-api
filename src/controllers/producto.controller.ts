import { Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { ProductoInterface } from "../interfaces/producto.interface";
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerProductosConFiltros,
  habilitarDeshabilitarProducto,
} from "../services/producto";
import { RequestExt } from "../interfaces/request.interface";

const getProductoByID = async (req: RequestExt, res: Response) => {
  try {
    // const { query,params,body,user } = req;
    // const productoId: number = query.id;
    // const producto: ProductoInterface | null = await obtenerProductoPorId(productoId);
    // res.status(200).send(producto);
  } catch (e) {
    handleHttp(res, "Error_getProducto");
  }
};

const getProductosFiltradas = async (req: RequestExt, res: Response) => {
  try {
    const { tipo, habilitado, nombre } = req.query;
    const productos: ProductoInterface[] = await obtenerProductosConFiltros(
      tipo !== undefined ? Number(tipo) : null,
      habilitado !== undefined ? Boolean(habilitado) : null,
      nombre !== undefined ? String(nombre) : null
    );
    res.status(200).send(productos);
  } catch (e) {
    handleHttp(res, "Error_getProducto");
  }
};

const postProducto = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const nuevaProducto: ProductoInterface = body;
    const responseProducto = await crearProducto(nuevaProducto);
    res.status(201).send(responseProducto);
  } catch (e) {
    handleHttp(res, "Error_postProducto");
  }
};

const putProducto = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const datosActualizados: ProductoInterface = { ...body };

    const responseProducto = await actualizarProducto(datosActualizados);
    console.log(responseProducto);
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    handleHttp(res, "Error_putProducto");
  }
};

const putHabilitarDeshabilitarProducto = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const productoId: number = body.id;
    const habilitado: boolean = body.habilitado;
    const responseProducto = await habilitarDeshabilitarProducto(productoId, habilitado);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_putHabilitarDeshabilitarProducto");
  }
};

const deleteProducto = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const productoId: number = body.id;
    const responseProducto = await eliminarProducto(productoId);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_deleteProducto");
  }
};

export {
  getProductoByID,
  getProductosFiltradas,
  postProducto,
  putProducto,
  putHabilitarDeshabilitarProducto,
  deleteProducto,
};
