import { sign, verify } from "jsonwebtoken";
import { AuthType } from "../interfaces/empleado.interface";

const JWT_SECRET = process.env.JWT_SECRET || "OthilaBar";

const generateToken = async (user: AuthType) => {
  if (JWT_SECRET !== null) {
    const jwt = sign({ user }, JWT_SECRET, {
      expiresIn: "8h",
    });
    return jwt;
  } else {
    console.log("❌ No se ha definido la clave para los JWT");
  }
};

const decodeToken = (token: string): AuthType | null => {
  try {
    const decoded = verify(token, JWT_SECRET) as { user: AuthType };
    return decoded.user;
  } catch (error) {
    console.error("❌ Error al decodificar el token:", error);
    return null;
  }
};

const verifyToken = (jwtToken: string) => {
  const esValido = verify(jwtToken, JWT_SECRET);
  return esValido;
};

export { generateToken, decodeToken, verifyToken };
