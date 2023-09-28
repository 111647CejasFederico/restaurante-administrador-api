import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import Producto from "./producto.model";
import Carta from "./carta.model";
import Promocion from "./promocion.model";
import { DetalleCartaInterface } from "../interfaces/detalleCarta.interface";

class DetalleCarta extends Model<DetalleCartaInterface> implements DetalleCartaInterface {
  id!: number;
  carta!: number;
  promocion!: number;
  producto!: number;
}

DetalleCarta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    carta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Carta,
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
    promocion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Promocion,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "DetalleCarta",
    tableName: "detalles_carta",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

DetalleCarta.belongsTo(Carta, {
  foreignKey: "carta",
  as: "DetalleCartaCarta",
});

DetalleCarta.belongsTo(Producto, {
  foreignKey: "producto",
  as: "DetalleCartaProducto",
});

export default DetalleCarta;
