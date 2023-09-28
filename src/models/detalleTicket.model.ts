import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import Producto from "./producto.model";
import Ticket from "./ticket.model";
import Promocion from "./promocion.model";
import { DetalleTicketInterface } from "../interfaces/detalleTicket.interface";

class DetalleTicket extends Model<DetalleTicketInterface> implements DetalleTicketInterface {
  id!: number;
  ticket!: number;
  promocion!: number;
  producto!: number;
  nombreProducto!: string;
  cantidad!: number;
  precio!: number;
}

DetalleTicket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ticket: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ticket,
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
    modelName: "DetalleTicket",
    tableName: "detalles_ticket",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

DetalleTicket.belongsTo(Ticket, {
  foreignKey: "ticket",
  as: "DetalleTicketTicket",
});

DetalleTicket.belongsTo(Promocion, {
  foreignKey: "promocion",
  as: "DetalleTicketPromocion",
});

DetalleTicket.belongsTo(Producto, {
  foreignKey: "producto",
  as: "DetalleTicketProducto",
});

export default DetalleTicket;
