import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import { CartaInterface } from "../interfaces/carta.interface";

class Carta extends Model<CartaInterface> implements CartaInterface {
  id!: number;
  nombre!: string;
  descripcion!: string;
  fechaInicioValidez!: string; // Se asume que este es un string en formato "YYYY-MM-DD"
  fechaFinValidez!: string; // Se asume que este es un string en formato "YYYY-MM-DD"
  habilitado!: boolean;
}

Carta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaInicioValidez: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fechaFinValidez: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    habilitado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Carta",
    tableName: "cartas",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

export default Carta;
