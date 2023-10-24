import { Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { AuthType, EmpleadoInterface } from "../interfaces/empleado.interface";
import {
  actualizarEmpleado,
  eliminarEmpleado,
  habilitarDeshabilitarEmpleado,
  obtenerEmpleadoPorId,
  obtenerEmpleadoPorUsuario,
  obtenerEmpleados,
  obtenerEmpleadosConFiltros,
} from "../services/empleado";
import { RequestExt } from "../interfaces/request.interface";
import { decodeToken } from "../utils/jwt.handle";

const getEmpleados = async (req: RequestExt, res: Response) => {
  try {
    const empleados: EmpleadoInterface[] | null = await obtenerEmpleados();
    res.status(200).json(empleados);
  } catch (e) {
    handleHttp(res, "Error_getEmpleados");
  }
};

const getEmpleadoBySesion = async (req: RequestExt, res: Response) => {
  try {
    const token = req.headers.authorization || "";
    const jwt = token.split(" ").pop();
    const sesion: AuthType | null = decodeToken(`${jwt}`);
    //@ts-ignore
    res.status(200).send(sesion.dataValues);
  } catch (e) {
    console.log(e);
    handleHttp(res, "Error_getEmpleadoBySesion");
  }
};

const getEmpleadoByID = async (req: RequestExt, res: Response) => {
  try {
    const { params } = req;
    const empleadoId: number = parseInt(params.id);
    const empleado: EmpleadoInterface | null = await obtenerEmpleadoPorId(empleadoId);
    res.status(200).send(empleado);
  } catch (e) {
    handleHttp(res, "Error_getEmpleado");
  }
};

const getEmpleadosFiltradas = async (req: RequestExt, res: Response) => {
  try {
    const { rol, estado, nombre, apellido } = req.query;
    const empleados: EmpleadoInterface[] | null = await obtenerEmpleadosConFiltros(
      rol !== undefined ? Number(rol) : null,
      estado !== undefined ? Number(estado) : null,
      nombre !== undefined ? String(nombre) : null,
      apellido !== undefined ? String(apellido) : null
    );
    res.status(200).send(empleados);
  } catch (e) {
    handleHttp(res, "Error_getEmpleado");
  }
};

const putEmpleado = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const empleadoId: number = body.id;
    const datosActualizados: EmpleadoInterface = body;
    const responseEmpleado = await actualizarEmpleado(empleadoId, datosActualizados);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_putEmpleado");
  }
};

const putHabilitarDeshabilitarEmpleado = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const empleadoId: number = body.id;
    const estado: number = body.estado;
    const responseEmpleado = await habilitarDeshabilitarEmpleado(empleadoId, estado);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_putEmpleado");
  }
};

const deleteEmpleado = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const empleadoId: number = body.id;
    const responseEmpleado = await eliminarEmpleado(empleadoId);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "Error_deleteEmpleado");
  }
};

export {
  getEmpleados,
  getEmpleadoByID,
  getEmpleadosFiltradas,
  getEmpleadoBySesion,
  putEmpleado,
  putHabilitarDeshabilitarEmpleado,
  deleteEmpleado,
};
