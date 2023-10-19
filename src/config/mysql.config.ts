import "dotenv/config";
import { Sequelize } from "sequelize";

//@ts-ignore
const puerto: number = +process.env.DB_PORT || 3306;
const host: string = process.env.DB_HOST || "localhost";
const database: string = process.env.DB_DATABASE || "restaurante";
const user: string = process.env.DB_USER || "fekiso";
const pass: string = process.env.DB_PASS || "Pass@123";

const sequelize = new Sequelize(database, user, pass, {
  host: host,
  port: puerto,
  dialect: "mysql",
});

export default sequelize;
