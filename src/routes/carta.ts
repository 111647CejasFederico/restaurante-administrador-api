import { Router } from "express";
import {
  getCartas,
  getCartaByID,
  getCartasHabilitadas,
  postCarta,
  putCarta,
  deleteCarta,
} from "../controllers/carta.controller";
import { controlarJWT } from "../middlewares/session.middleware";

const router = Router();

// Rutas para Carta
router.get("/", controlarJWT, getCartas);
router.get("/habilitadas", controlarJWT, getCartasHabilitadas);
router.get("/:id", controlarJWT, getCartaByID);
router.post("/", controlarJWT, postCarta);
router.put("/", controlarJWT, putCarta);
router.delete("/:id", controlarJWT, deleteCarta);

export { router };
