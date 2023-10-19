import "dotenv/config";
import { Sequelize } from "sequelize";

//@ts-ignore
const puerto: number = 3306 || process.env.DB_PORT;
const host: string = "localhost" || process.env.DB_HOST;
const database: string = "restaurante" || process.env.DB_DATABASE;
const user: string = "fekiso" || process.env.DB_USER;
const pass: string = "Pass@123" || process.env.DB_PASS;

const sequelize = new Sequelize(database, user, pass, {
  host: host,
  port: puerto,
  dialect: "mysql",
});

export default sequelize;
