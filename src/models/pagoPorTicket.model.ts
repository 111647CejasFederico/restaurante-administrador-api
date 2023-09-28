import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import { PagosPorTicketInterface } from "../interfaces/pagoPorTicket.interface";
import Ticket from "./ticket.model";
import TipoPago from "./tipoPago.model";

class PagoPorTicket extends Model<PagosPorTicketInterface> implements PagoPorTicket {
  id!: number;
  ticket!: number[];
  tipoPago!: number[];
  importe!: number[];
}

PagoPorTicket.init(
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
    tipoPago: {
      type: DataTypes.TINYINT({ length: 1 }),
      allowNull: false,
      references: {
        model: TipoPago,
        key: "id",
      },
    },
    importe: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PagoPorTicket",
    tableName: "pago_por_ticket",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
    omitNull: true,
  }
);

export default PagoPorTicket;
