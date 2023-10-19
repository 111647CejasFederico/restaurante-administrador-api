import { hash, compare } from "bcryptjs";

const encriptar = async (pass: string) => {
  const passwordHash = await hash(pass, 8);
  return passwordHash;
};
const verificar = async (pass: string, passHash: string) => {
  const esIgual = await compare(pass, passHash);
  return esIgual;
};

export { encriptar, verificar };
