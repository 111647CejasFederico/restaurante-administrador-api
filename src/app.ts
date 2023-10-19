import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerSetup from "./docs/swagger.docs";
import db from "./config/mysql.config";

import { router } from "./routes";

const PORT = process.env.PORT || 3010;
const app = express();
app.use(cors());
app.use(express.json());

app.use(router);
app.use("/swagger-documentation", swaggerUI.serve, swaggerUI.setup(swaggerSetup));

if (PORT !== null) {
  app.listen(PORT, async () => {
    try {
      console.log(`✔ Api sincronizada exitosamente a la base de datos`);
      console.log(`✔ Documentacion swagger: http://localhost:${PORT}/swagger-documentation`);
      await db.sync();
    } catch (e) {
      console.log(e);
    }
  });
} else {
  console.log("❌ No se ha predefinido un puerto para la api");
}
