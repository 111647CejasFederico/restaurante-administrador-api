import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql.config";
import { EmpleadoInterface } from "../interfaces/empleado.interface";
import TipoRol from "./tipoRol.model";
import TipoEstadoUsuario from "./tipoEstadoUsuario.model";

class Empleado extends Model<EmpleadoInterface> implements Empleado {
  id!: number;
  user!: string;
  pass!: string;
  nombre!: string;
  apellido!: string;
  nroDocumento!: number;
  rol!: number;
  estado!: boolean;
  telefono!: string;
  email!: string;
}

Empleado.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nroDocumento: {
      type: DataTypes.DECIMAL(9, 0),
      unique: true,
      allowNull: false,
    },
    rol: {
      type: DataTypes.TINYINT({ length: 1 }),
      allowNull: false,
      references: {
        model: TipoRol,
        key: "id",
      },
    },
    estado: {
      type: DataTypes.TINYINT({ length: 1 }),
      allowNull: false,
      references: {
        model: TipoEstadoUsuario,
        key: "id",
      },
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Empleado",
    tableName: "empleados",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
    omitNull: true,
  }
);

Empleado.belongsTo(TipoRol, {
  foreignKey: "rol",
  as: "Rol",
});

Empleado.belongsTo(TipoEstadoUsuario, {
  foreignKey: "estado",
  as: "EstadoUsuario",
});

export default Empleado;
