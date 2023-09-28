import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import sequelize from "./config/mysql.config";
import swaggerSetup from "./docs/swagger.docs";

const TipoRol = require("./models/tipoRol.model");
const TipoEstadoUsuario = require("./models/tipoEstadoUsuario.model");
const Empleado = require("./models/empleado.model");
const Mesa = require("./models/mesa.model");
const TipoProducto = require("./models/tipoProducto.model");
const Producto = require("./models/producto.model");
const TipoEstadoPromocion = require("./models/tipoEstadoPromocion.model");
const Promocion = require("./models/promocion.model");
const DetallePromocion = require("./models/detallePromocion.model");

const Carta = require("./models/carta.model");
const TipoPago = require("./models/tipoPago.model");
const Ticket = require("./models/ticket.model");
const PagoPorTicket = require("./models/pagoPorTicket.model");
const Pedido = require("./models/pedido.model");

const DetalleCarta = require("./models/detalleCarta.model");
const DetallePedido = require("./models/detallePedido.model");
const DetalleTicket = require("./models/detalleTicket.model");

const PORT = process.env.PORT || null;
const app = express();
app.use(cors());
app.use(express.json());

// app.use(router);
app.use("/swagger-documentation", swaggerUI.serve, swaggerUI.setup(swaggerSetup));

if (PORT !== null) {
  app.listen(PORT, async () => {
    try {
      console.log(`✔ Api sincronizada exitosamente a la base de datos`);
      console.log(`✔ Documentacion swagger: http://localhost:${PORT}/swagger-documentation`);
    } catch (e) {
      console.log(e);
    }
  });
} else {
  console.log("❌ No se ha predefinido un puerto para la api");
}
