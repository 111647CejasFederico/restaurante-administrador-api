import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import { ProductoInterface } from "../interfaces/producto.interface";
import TipoProducto from "./tipoProducto.model";

class Producto extends Model<ProductoInterface> implements Producto {
  id!: number;
  nombre!: string;
  descripcion!: string;
  tipo!: number;
  precio!: number;
  habilitado!: boolean;
}

Producto.init(
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
      allowNull: true,
    },
    tipo: {
      type: DataTypes.TINYINT({ length: 1 }),
      allowNull: false,
      references: {
        model: TipoProducto,
        key: "id",
      },
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    habilitado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "Producto",
    tableName: "productos",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

Producto.belongsTo(TipoProducto, {
  foreignKey: "tipo",
  as: "TipoProducto",
});

export default Producto;
