import { Op } from "sequelize";
import { EmpleadoInterface } from "../interfaces/empleado.interface";
import Empleado from "../models/empleado.model";
import TipoRol from "../models/tipoRol.model";
import TipoEstadoUsuario from "../models/tipoEstadoUsuario.model";

// Obtener todas las empleados
const obtenerEmpleados = async (): Promise<EmpleadoInterface[]> => {
  try {
    const empleados = await Empleado.findAll();
    //@ts-ignore
    return empleados;
  } catch (error) {
    throw new Error("Error al obtener empleados");
  }
};

// Obtener una empleado por su ID
const obtenerEmpleadoPorId = async (empleadoId: number): Promise<EmpleadoInterface | null> => {
  try {
    //@ts-ignore
    let empleado: EmpleadoInterface | null = await Empleado.findByPk(empleadoId);
    return empleado;
  } catch (error) {
    throw new Error("Error al obtener la empleado por ID");
  }
};

const obtenerEmpleadosConFiltros = async (
  rol: number | null,
  estado: number | null,
  nombre: string | null,
  apellido: string | null
): Promise<EmpleadoInterface[]> => {
  try {
    const condiciones: any = {};
    if (rol !== null && rol) {
      condiciones.rol = rol;
    }
    if (estado !== null && estado) {
      condiciones.estado = estado;
    }
    if (nombre !== null && nombre) {
      condiciones.nombre = { [Op.like]: `%${nombre}%` };
    }
    if (apellido !== null && apellido) {
      condiciones.apellido = { [Op.like]: `%${apellido}%` };
    }

    //@ts-ignore
    const empleados: EmpleadoInterface[] = await Empleado.findAll({
      where: condiciones,
      include: [
        {
          model: TipoRol,
          as: "Rol",
          attributes: ["nombre", "habilitado"],
        },
        {
          model: TipoEstadoUsuario,
          as: "EstadoUsuario",
          attributes: ["nombre", "habilitado"],
        },
      ],
    });

    return empleados;
  } catch (error) {
    throw new Error("Error al obtener empleados con filtros");
  }
};

// Crear una nueva empleado
const crearEmpleado = async (nuevaEmpleado: EmpleadoInterface): Promise<EmpleadoInterface> => {
  try {
    //@ts-ignore
    const empleadoCreada: EmpleadoInterface = await Empleado.create(nuevaEmpleado);
    return empleadoCreada;
  } catch (error) {
    throw new Error("Error al crear la empleado");
  }
};

// Actualizar una empleado por su ID
const actualizarEmpleado = async (
  empleadoId: number,
  datosActualizados: EmpleadoInterface
): Promise<number> => {
  try {
    const resultado: [number] = await Empleado.update(datosActualizados, {
      where: { id: empleadoId },
    });
    return resultado[0];
  } catch (error) {
    throw new Error("Error al actualizar la empleado");
  }
};

// habilito una empleado por su ID
const habilitarDeshabilitarEmpleado = async (
  empleadoId: number,
  estado: number
): Promise<number> => {
  try {
    const resultado: [number] = await Empleado.update(
      { estado: estado },
      {
        where: { id: empleadoId },
      }
    );
    return resultado[0];
  } catch (error) {
    throw new Error("Error al actualizar la empleado");
  }
};

// Eliminar una empleado por su ID
const eliminarEmpleado = async (empleadoId: number): Promise<number> => {
  try {
    const resultado: number = await Empleado.destroy({
      where: { id: empleadoId },
    });
    return resultado;
  } catch (error) {
    throw new Error("Error al eliminar la empleado");
  }
};

export {
  obtenerEmpleados,
  obtenerEmpleadoPorId,
  obtenerEmpleadosConFiltros,
  crearEmpleado,
  actualizarEmpleado,
  habilitarDeshabilitarEmpleado,
  eliminarEmpleado,
};
