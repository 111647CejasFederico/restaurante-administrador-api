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
router.put("/", controlarJWT, putTipoEstadoPromocion);
router.delete("/", controlarJWT, deleteTipoEstadoPromocion);

export { router };
