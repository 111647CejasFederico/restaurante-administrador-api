import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import { TipoEstadoPromocionInterface } from "../interfaces/tipo.interface";

class TipoEstadoPromocion
  extends Model<TipoEstadoPromocionInterface>
  implements TipoEstadoPromocion
{
  id!: number;
  nombre!: string;
  descripcion!: string;
  habilitado!: boolean;
}

TipoEstadoPromocion.init(
  {
    id: {
      type: DataTypes.TINYINT({ length: 1 }),
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
    habilitado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "TipoEstadoPromocion",
    tableName: "tipos_estado_promocion",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

export default TipoEstadoPromocion;
