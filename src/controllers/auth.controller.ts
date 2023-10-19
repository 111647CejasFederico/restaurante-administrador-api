import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { loginUsuario, registrarNuevoUsuario } from "../services/auth";
import { AuthType, EmpleadoInterface } from "../interfaces/empleado.interface.js";
import { RequestExt } from "../interfaces/request.interface";

const postRegistrar = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    let NuevoEmpleado: EmpleadoInterface = { ...body };
    const responseUser = await registrarNuevoUsuario(NuevoEmpleado);
    if (responseUser === "Empleado ya existente") res.status(500).send(responseUser);
    else res.status(201).send(responseUser);
  } catch (e) {
    handleHttp(res, "Error_postRegistrar");
  }
};

const postLogin = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    let nuevoLogin: AuthType = { ...body };
    const responseUser = await loginUsuario(nuevoLogin);
    if (responseUser === "Credenciales incorrectas") res.status(403).send(responseUser);
    else res.status(200).send(responseUser);
  } catch (e) {
    handleHttp(res, "Error_postLogin");
  }
};

export { postRegistrar, postLogin };
