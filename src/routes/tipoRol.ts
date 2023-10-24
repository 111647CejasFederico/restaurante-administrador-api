import { Router } from "express";

import {
  deleteTipoRol,
  getTipoRolsFiltradas,
  postTipoRol,
  putTipoRol,
} from "../controllers/tipoRol.controller";
import { controlarJWT } from "../middlewares/session.middleware";

const router = Router();

router.get("/", controlarJWT, getTipoRolsFiltradas);
router.post("/", controlarJWT, postTipoRol);
router.put("/", controlarJWT, putTipoRol);
router.delete("/", controlarJWT, deleteTipoRol);

export { router };
