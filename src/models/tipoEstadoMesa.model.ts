import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import { TipoEstadoMesaInterface } from "../interfaces/tipo.interface";

class TipoEstadoMesa extends Model<TipoEstadoMesaInterface> implements TipoEstadoMesa {
  id!: number;
  nombre!: string;
  descripcion!: string;
  habilitado!: boolean;
}

TipoEstadoMesa.init(
  {
    id: {
      type: DataTypes.TINYINT({ length: 1 }),
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    habilitado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "TipoEstadoMesa",
    tableName: "tipos_estado_mesa",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

export default TipoEstadoMesa;
