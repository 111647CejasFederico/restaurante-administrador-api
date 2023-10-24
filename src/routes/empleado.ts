import { Router } from "express";
import { controlarJWT } from "../middlewares/session.middleware";
import {
  deleteEmpleado,
  getEmpleadoByID,
  getEmpleadoBySesion,
  getEmpleadosFiltradas,
  putEmpleado,
} from "../controllers/empleado.controller";

const router = Router();

router.get("/", controlarJWT, getEmpleadosFiltradas);
router.get("/getMe", controlarJWT, getEmpleadoBySesion);
router.get("/:id", controlarJWT, getEmpleadoByID);
router.put("/:id", controlarJWT, putEmpleado);
router.delete("/:id", controlarJWT, deleteEmpleado);

export { router };
