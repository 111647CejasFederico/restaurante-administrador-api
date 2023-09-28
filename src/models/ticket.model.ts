import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import { TicketInterface } from "../interfaces/ticket.interface";
import Empleado from "./empleado.model";
import Mesa from "./mesa.model";

class Ticket extends Model<TicketInterface> implements TicketInterface {
  id!: number;
  valida!: boolean;
  mesa!: number;
  empleadoAtiende!: number;
  empleadoFacturo!: number;
}

Ticket.init(
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
    empleadoFacturo: {
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
    modelName: "Ticket",
    tableName: "tickets",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

Ticket.belongsTo(Mesa, {
  foreignKey: "mesa",
  as: "MesaTicket",
});

Ticket.belongsTo(Empleado, {
  foreignKey: "empleadoAtiende",
  as: "EmpleadoAtiende",
});

Ticket.belongsTo(Empleado, {
  foreignKey: "empleadoFacturo",
  as: "EmpleadoFacturo",
});

export default Ticket;
