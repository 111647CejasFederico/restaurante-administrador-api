import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import { MesaInterface } from "../interfaces/mesa.interface";
import Ubicacion from "./ubicacion.model";

class Mesa extends Model<MesaInterface> implements Mesa {
  id!: number;
  ubicacion!: number;
  estado!: number;
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
      references: {
        model: Ubicacion,
        key: "id",
      },
    },
    estado: {
      type: DataTypes.INTEGER,
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

Mesa.belongsTo(Ubicacion, {
  foreignKey: "ubicacion",
  as: "UbicacionMesa",
});

export default Mesa;
