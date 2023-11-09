import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config"; // Importa tu configuración de Sequelize
import { UbicacionInterface } from "../interfaces/ubicacion.interface";

class Ubicacion extends Model implements UbicacionInterface {
  id!: number;
  nombre!: string;
  descripcion!: string;
  fila!: number;
  columna!: number;
  disponible!: boolean;
  habilitado!: boolean;
}
Ubicacion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fila: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    columna: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    habilitado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Ubicacion", // Nombre de la tabla en la base de datos
    tableName: "ubicaciones", // Nombre de la tabla en la base de datos
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
    omitNull: true,
  }
);
export default Ubicacion;
