import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import { MesaInterface } from "../interfaces/mesa.interface";

class Mesa extends Model<MesaInterface> implements Mesa {
  id!: number;
  ubicacion!: number;
  habilitado!: boolean;
}

Mesa.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ubicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    habilitado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Mesa",
    tableName: "mesas",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
    omitNull: true,
  }
);

export default Mesa;
