import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import Producto from "./producto.model";
import Pedido from "./pedido.model";
import { DetallePedidoInterface } from "../interfaces/detallePedido.interface";
import Promocion from "./promocion.model";

class DetallePedido extends Model<DetallePedidoInterface> implements DetallePedidoInterface {
  id!: number;
  pedido!: number;
  promocion!: number;
  producto!: number;
  nombreProducto!: string;
  cantidad!: number;
  precio!: number;
}

DetallePedido.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pedido,
        key: "id",
      },
    },
    promocion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Promocion,
        key: "id",
      },
    },
    producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Producto,
        key: "id",
      },
    },
    nombreProducto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "DetallePedido",
    tableName: "detalles_pedido",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

DetallePedido.belongsTo(Pedido, {
  foreignKey: "pedido",
  as: "DetallePedidoPedido",
});

DetallePedido.belongsTo(Promocion, {
  foreignKey: "promocion",
  as: "DetallePedidoPromocion",
});

DetallePedido.belongsTo(Producto, {
  foreignKey: "producto",
  as: "DetallePedidoProducto",
});

export default DetallePedido;
