import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import { TipoPagoInterface } from "../interfaces/tipo.interface";

class TipoPago extends Model<TipoPagoInterface> implements TipoPago {
  id!: number;
  nombre!: string;
  descripcion!: string;
  habilitado!: boolean;
}

TipoPago.init(
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
    modelName: "TipoPago",
    tableName: "tipos_pago",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

export default TipoPago;
