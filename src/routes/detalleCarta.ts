import { Router } from "express";
import { controlarJWT } from "../middlewares/session.middleware";
import {
  deleteDetalleCarta,
  getDetalleCartaByID,
  getDetallesCartaFiltradas,
  postDetalleCarta,
  putDetalleCarta,
} from "../controllers/detalleCarta.controller";

const router = Router();

router.get("/", controlarJWT, getDetallesCartaFiltradas);
router.get("/:id", controlarJWT, getDetalleCartaByID);
router.post("/", controlarJWT, postDetalleCarta);
router.put("/", controlarJWT, putDetalleCarta);
router.delete("/:id", controlarJWT, deleteDetalleCarta);

export { router };
