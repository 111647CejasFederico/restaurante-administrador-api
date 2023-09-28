import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import { TipoEstadoPedidoInterface } from "../interfaces/tipo.interface";

class TipoEstadoPedido extends Model<TipoEstadoPedidoInterface> implements TipoEstadoPedido {
  id!: number;
  nombre!: string;
  descripcion!: string;
  habilitado!: boolean;
}

TipoEstadoPedido.init(
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
    modelName: "TipoEstadoPedido",
    tableName: "tipos_estado_pedido",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

export default TipoEstadoPedido;
