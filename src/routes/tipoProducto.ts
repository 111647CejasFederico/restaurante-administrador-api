import { Router } from "express";

import {
  deleteTipoProducto,
  getTipoProductosFiltradas,
  postTipoProducto,
  putTipoProducto,
} from "../controllers/tipoProducto.controller";
import { controlarJWT } from "../middlewares/session.middleware";

const router = Router();

router.get("/", controlarJWT, getTipoProductosFiltradas);
router.post("/", controlarJWT, postTipoProducto);
router.put("/:id", controlarJWT, putTipoProducto);
router.delete("/:id", controlarJWT, deleteTipoProducto);

export { router };
