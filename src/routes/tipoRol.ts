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
router.put("/:id", controlarJWT, putTipoRol);
router.delete("/:id", controlarJWT, deleteTipoRol);

export { router };
