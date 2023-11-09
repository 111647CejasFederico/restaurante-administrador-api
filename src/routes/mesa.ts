import { Router } from "express";
import { controlarJWT } from "../middlewares/session.middleware";
import {
  getMesaByID,
  getMesasFiltradas,
  intercambiarUbicaciones,
  postMesa,
  putMesa,
} from "../controllers/mesa.controller";

const router = Router();

router.get("/", controlarJWT, getMesasFiltradas);
router.get("/:id", controlarJWT, getMesaByID);
router.post("/", controlarJWT, postMesa);
router.put("/", controlarJWT, putMesa);
router.put("/intercambiar", controlarJWT, intercambiarUbicaciones);

export { router };
