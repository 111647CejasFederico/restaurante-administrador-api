import { ProductoInterface } from "./producto.interface";
import { PromocionInterface } from "./promocion.interface";

export interface DetalleCartaInterface {
  id: number;
  carta: number;
  promocion: number | null;
  producto: number | null;
  cantidadDisponible: number | null;
  diponible: boolean;
  visible: boolean;
  Promocion?: PromocionInterface;
  Producto?: ProductoInterface | null;
}
