import { Router } from "express";
import { postLogin, postRegistrar } from "../controllers/auth.controller";
import { controlarJWT } from "../middlewares/session.middleware";
const router = Router();

router.post("/register", postRegistrar);
router.post("/login", postLogin);

export { router };
