import { Router } from "express";
import {
  deleteProducto,
  getProductoByID,
  getProductosFiltradas,
  postProducto,
  putProducto,
} from "../controllers/producto.controller";
import { controlarJWT } from "../middlewares/session.middleware";

const router = Router();

router.get("/", controlarJWT, getProductosFiltradas);
router.get("/:id", controlarJWT, getProductoByID);
router.post("/", controlarJWT, postProducto);
router.put("/:id", controlarJWT, putProducto);
router.delete("/:id", controlarJWT, deleteProducto);

export { router };
