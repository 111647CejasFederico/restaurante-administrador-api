import "dotenv/config";
import { Sequelize } from "sequelize";

const database: string = process.env.DB_DATABASE || "";
const user: string = process.env.DB_USER || "";
const pass: string = process.env.DB_PASS || "";
const host: string = process.env.DB_HOST || "";
//@ts-ignore
const puerto: number = +process.env.DB_PORT || 0;

const sequelize = new Sequelize(database, user, pass, {
  host: host,
  port: puerto,
  dialect: "mysql",
});

export default sequelize;
