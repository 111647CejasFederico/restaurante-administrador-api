import { Router } from "express";

import {
  deleteTipoEstadoUsuario,
  getTipoEstadoUsuariosFiltrados,
  postTipoEstadoUsuario,
  putTipoEstadoUsuario,
} from "../controllers/tipoEstadoUsuario.controller";
import { controlarJWT } from "../middlewares/session.middleware";

const router = Router();

router.get("/", controlarJWT, getTipoEstadoUsuariosFiltrados);
router.post("/", controlarJWT, postTipoEstadoUsuario);
router.put("/", controlarJWT, putTipoEstadoUsuario);
router.delete("/", controlarJWT, deleteTipoEstadoUsuario);

export { router };
