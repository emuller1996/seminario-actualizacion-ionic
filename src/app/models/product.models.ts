import { Category } from "./category.model";

export class Producto {
  id: number = 0;
  nombre: string = '';
  detalle: string = '';
  precio: number = 0;
  costo: number = 0;
  existencias: number = 0;
  categoriaId: number = 0;
  fechaCreacion: Date = new Date();
  estado: boolean = true;
  CATEGORIA:Category=new Category()
}
