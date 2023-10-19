import { Router } from "express";
import { controlarJWT } from "../middlewares/session.middleware";
import {
  deletePromocion,
  getPromocionByID,
  getPromocionesFiltradas,
  postPromocion,
  putPromocion,
} from "../controllers/promocion.controller";

const router = Router();

router.get("/", controlarJWT, getPromocionesFiltradas);
router.get("/:id", controlarJWT, getPromocionByID);
router.post("/", controlarJWT, postPromocion);
router.put("/:id", controlarJWT, putPromocion);
router.delete("/:id", controlarJWT, deletePromocion);

export { router };
