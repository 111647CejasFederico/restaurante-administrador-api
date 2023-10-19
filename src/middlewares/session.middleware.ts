import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { RequestExt } from "../interfaces/request.interface";

const controlarJWT = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization || "";
    const jwt = token.split(" ").pop();
    const usuarioValido = verifyToken(`${jwt}`);
    if (!usuarioValido) res.status(401).send("Sesion invalida");
    else {
      req.user = usuarioValido;
      next();
    }
  } catch (e) {
    res.status(401).send("Sesion invalida");
  }
};

export { controlarJWT };
