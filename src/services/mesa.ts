// mesaService.ts
import { Op, where } from "sequelize";
import Mesa from "../models/mesa.model";
import Ubicacion from "../models/ubicacion.model";
import { MesaInterface } from "../interfaces/mesa.interface";
import { actualizarUbicacion } from "./ubicacion";

const obtenerMesas = async (): Promise<MesaInterface[] | null> => {
  try {
    const mesas: MesaInterface[] | null = await Mesa.findAll({
      include: [
        {
          model: Ubicacion,
          as: "UbicacionMesa",
        },
      ],
    });
    return mesas;
  } catch (error) {
    throw new Error("Error al obtener mesas");
  }
};

const obtenerMesaPorId = async (mesaId: number): Promise<MesaInterface | null> => {
  try {
    const mesa: MesaInterface | null = await Mesa.findByPk(mesaId, {
      include: [
        {
          model: Ubicacion,
          as: "UbicacionMesa",
        },
      ],
    });
    return mesa;
  } catch (error) {
    throw new Error("Error al obtener la mesa por ID");
  }
};

const obtenerMesasConFiltros = async (
  ubicacion: number | null,
  estado: number | null
): Promise<MesaInterface[] | null> => {
  try {
    const condiciones: any = {};

    if (ubicacion !== null) {
      condiciones.ubicacion = ubicacion;
    }
    if (estado !== null) {
      condiciones.estado = estado;
    }

    const mesas: MesaInterface[] | null = await Mesa.findAll({
      where: condiciones,
      include: [
        {
          model: Ubicacion,
          as: "UbicacionMesa",
        },
      ],
    });

    return mesas;
  } catch (error) {
    throw new Error("Error al obtener mesas con filtros");
  }
};

const crearMesa = async (nuevaMesa: MesaInterface): Promise<MesaInterface> => {
  try {
    // Verificar si la ubicación asociada está disponible
    const ubicacion: Ubicacion | null = await Ubicacion.findByPk(nuevaMesa.ubicacion);
    if (ubicacion && ubicacion.disponible) {
      // Actualizar el estado de la ubicación a no disponible
      await ubicacion.update({ disponible: false });

      // Crear la nueva mesa
      const mesaCreada: MesaInterface = await Mesa.create(nuevaMesa);
      return mesaCreada;
    } else {
      throw new Error("Ubicación no disponible");
    }
  } catch (error) {
    throw new Error("Error al crear la mesa");
  }
};

const actualizarMesa = async (datosActualizados: MesaInterface): Promise<number> => {
  try {
    const resultado: [number] = await Mesa.update(datosActualizados, {
      where: { id: datosActualizados.id },
    });
    if (datosActualizados.estado === 2) {
      await actualizarUbicacion(datosActualizados.ubicacion, { disponible: true });
    }
    return resultado[0];
  } catch (error) {
    throw new Error("Error al actualizar la mesa");
  }
};

const intercambiarMesas = async (mesaId1: number, mesaId2: number): Promise<void> => {
  try {
    // Obtenemos las mesas a intercambiar
    const mesa1: Mesa | null = await Mesa.findByPk(mesaId1, {
      include: [
        {
          model: Ubicacion,
          as: "UbicacionMesa",
        },
      ],
    });

    const mesa2: Mesa | null = await Mesa.findByPk(mesaId2, {
      include: [
        {
          model: Ubicacion,
          as: "UbicacionMesa",
        },
      ],
    });

    if (mesa1 && mesa2 && mesa1.ubicacion && mesa2.ubicacion) {
      // Intercambiar las ubicaciones de las mesas
      const ubicacionMesa1 = mesa1.ubicacion;
      const ubicacionMesa2 = mesa2.ubicacion;

      await mesa1.update({ ubicacion: ubicacionMesa2 }, { where: { id: mesaId1 } });
      await mesa2.update({ ubicacion: ubicacionMesa1 }, { where: { id: mesaId2 } });
    }
  } catch (error) {
    throw new Error("Error al intercambiar mesas");
  }
};

export {
  obtenerMesas,
  obtenerMesaPorId,
  obtenerMesasConFiltros,
  crearMesa,
  actualizarMesa,
  intercambiarMesas,
};
