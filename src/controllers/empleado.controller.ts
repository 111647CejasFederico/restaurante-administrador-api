import { Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { EmpleadoInterface } from "../interfaces/empleado.interface";
import {
  actualizarEmpleado,
  eliminarEmpleado,
  habilitarDeshabilitarEmpleado,
  obtenerEmpleadoPorId,
  obtenerEmpleados,
  obtenerEmpleadosConFiltros,
} from "../services/empleado";
import { RequestExt } from "../interfaces/request.interface";

const getEmpleados = async (req: RequestExt, res: Response) => {
  try {
    const empleados: EmpleadoInterface[] = await obtenerEmpleados();
    res.status(200).json(empleados);
  } catch (e) {
    handleHttp(res, "Error_getEmpleados");
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
    const { body } = req;
    const { rol, estado, nombre, apellido } = body;
    const empleados: EmpleadoInterface[] = await obtenerEmpleadosConFiltros(
      rol,
      estado,
      nombre,
      apellido
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
    res.status(204).send(responseEmpleado);
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
    res.status(204).send(responseEmpleado);
  } catch (e) {
    handleHttp(res, "Error_putEmpleado");
  }
};

const deleteEmpleado = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const empleadoId: number = body.id;
    const responseEmpleado = await eliminarEmpleado(empleadoId);
    res.status(204).send(responseEmpleado);
  } catch (e) {
    handleHttp(res, "Error_deleteEmpleado");
  }
};

export {
  getEmpleados,
  getEmpleadoByID,
  getEmpleadosFiltradas,
  putEmpleado,
  putHabilitarDeshabilitarEmpleado,
  deleteEmpleado,
};
