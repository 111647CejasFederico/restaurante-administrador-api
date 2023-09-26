import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import { TipoProductoInterface } from "../interfaces/tipo.interface";

class TipoProducto extends Model<TipoProductoInterface> implements TipoProducto {
  id!: number;
  nombre!: string;
  descripcion!: string;
  habilitado!: boolean;
}

TipoProducto.init(
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
    modelName: "TipoProducto",
    tableName: "tipos_producto",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

export default TipoProducto;
