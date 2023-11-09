import { Router } from "express";
import { controlarJWT } from "../middlewares/session.middleware";
import {
  getUbicacionByID,
  getUbicacionesConFiltros,
  putUbicacion,
} from "../controllers/ubicacion.controller";

const router = Router();
router.get("/", controlarJWT, getUbicacionesConFiltros);
router.get("/:id", controlarJWT, getUbicacionByID);
router.put("/", controlarJWT, putUbicacion);

export { router };
