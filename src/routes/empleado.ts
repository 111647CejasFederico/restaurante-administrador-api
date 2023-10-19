import { Router } from "express";
import { controlarJWT } from "../middlewares/session.middleware";
import {
  deleteEmpleado,
  getEmpleadoByID,
  getEmpleadosFiltradas,
  putEmpleado,
} from "../controllers/empleado.controller";

const router = Router();

router.get("/", controlarJWT, getEmpleadosFiltradas);
router.get("/:id", controlarJWT, getEmpleadoByID);
router.put("/:id", controlarJWT, putEmpleado);
router.delete("/:id", controlarJWT, deleteEmpleado);

export { router };
