import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import Producto from "./producto.model";
import Promocion from "./promocion.model";
import { DetallePromocionInterface } from "../interfaces/detallePromocion.interface";

class DetallePromocion
  extends Model<DetallePromocionInterface>
  implements DetallePromocionInterface
{
  id!: number;
  promocion!: number;
  producto!: number;
  bebida!: number;
  cantidad!: number;
}

DetallePromocion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  },
  {
    sequelize,
    modelName: "DetallePromocion",
    tableName: "detalles_promocion",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

export default DetallePromocion;
