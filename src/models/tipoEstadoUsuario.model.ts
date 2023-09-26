import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import { TipoEstadoUsuarioInterface } from "../interfaces/tipo.interface";

class TipoEstadoUsuario extends Model<TipoEstadoUsuarioInterface> implements TipoEstadoUsuario {
  id!: number;
  nombre!: string;
  descripcion!: string;
  habilitado!: boolean;
}

TipoEstadoUsuario.init(
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
    modelName: "TipoEstadoUsuario",
    tableName: "tipos_estado_usuario",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

export default TipoEstadoUsuario;
