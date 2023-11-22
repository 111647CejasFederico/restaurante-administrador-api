import { Router } from "express";

import {
  deleteTipoEstadoMesa,
  getTipoEstadoMesasFiltrados,
  postTipoEstadoMesa,
  putTipoEstadoMesa,
} from "../controllers/tipoEstadoMesa.controller";
import { controlarJWT } from "../middlewares/session.middleware";

const router = Router();

router.get("/", controlarJWT, getTipoEstadoMesasFiltrados);
router.post("/", controlarJWT, postTipoEstadoMesa);
router.put("/", controlarJWT, putTipoEstadoMesa);
router.delete("/", controlarJWT, deleteTipoEstadoMesa);

export { router };
