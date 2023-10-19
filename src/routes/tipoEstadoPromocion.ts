import { Router } from "express";

import {
  deleteTipoEstadoPromocion,
  getTipoEstadoPromocionsFiltrados,
  postTipoEstadoPromocion,
  putTipoEstadoPromocion,
} from "../controllers/tipoEstadoPromocion.controller";
import { controlarJWT } from "../middlewares/session.middleware";

const router = Router();

router.get("/", controlarJWT, getTipoEstadoPromocionsFiltrados);
router.post("/", controlarJWT, postTipoEstadoPromocion);
router.put("/:id", controlarJWT, putTipoEstadoPromocion);
router.delete("/:id", controlarJWT, deleteTipoEstadoPromocion);

export { router };
