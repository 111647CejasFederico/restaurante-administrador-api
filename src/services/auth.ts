import { Op } from "sequelize";
import { AuthType, EmpleadoInterface } from "../interfaces/empleado.interface";
import Empleado from "../models/empleado.model";
import { encriptar, verificar } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const registrarNuevoUsuario = async (nuevoEmpleado: EmpleadoInterface) => {
  const usuarioExistente = await Empleado.findOne({
    where: {
      [Op.or]: [{ user: nuevoEmpleado.user }, { nroDocumento: nuevoEmpleado.nroDocumento }],
    },
  });
  if (usuarioExistente) return "Empleado ya existente";
  else {
    nuevoEmpleado.pass = await encriptar(nuevoEmpleado.pass);
    const empleadoCreado = await Empleado.create(nuevoEmpleado);
    return empleadoCreado;
  }
};

const loginUsuario = async (authUser: AuthType) => {
  const usuarioExistente = await Empleado.findOne({
    where: { user: authUser.user },
  });
  if (!usuarioExistente) return "Credenciales incorrectas";
  else {
    const loginValido = await verificar(authUser.pass, usuarioExistente.pass);
    if (!loginValido) return "Credenciales incorrectas";

    const token = generateToken({ ...usuarioExistente });
    return token;
  }
};

export { registrarNuevoUsuario, loginUsuario };
