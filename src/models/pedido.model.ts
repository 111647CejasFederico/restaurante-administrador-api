import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import { PedidoInterface } from "../interfaces/pedido.interface";
import Empleado from "./empleado.model";
import Mesa from "./mesa.model";
import TipoEstadoPedido from "./tipoEstadoPedido.model";
import DetallePedido from "./detallePedido.model";

class Pedido extends Model<PedidoInterface> implements PedidoInterface {
  id!: number;
  valida!: boolean;
  estado!: number;
  mesa!: number;
  empleadoAtiende!: number;
}

Pedido.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    valida: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    estado: {
      type: DataTypes.TINYINT({ length: 1 }),
      allowNull: false,
      references: {
        model: TipoEstadoPedido,
        key: "id",
      },
    },
    mesa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mesa,
        key: "id",
      },
    },
    empleadoAtiende: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Empleado,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Pedido",
    tableName: "pedidos",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

Pedido.belongsTo(TipoEstadoPedido, {
  foreignKey: "estado",
  as: "EstadoPedido",
});

Pedido.belongsTo(Mesa, {
  foreignKey: "mesa",
  as: "MesaPedido",
});

Pedido.belongsTo(Empleado, {
  foreignKey: "empleadoAtiende",
  as: "EmpleadoAtiende",
});

export default Pedido;
