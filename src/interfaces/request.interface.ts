import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { AuthType } from "./empleado.interface";

export interface RequestExt extends Request {
  user?: string | JwtPayload;
}
