export class Factura {
  id: number = 0;
  hora: string = '';
  fecha: string = new Date().toISOString();
  subtotal: number = 0;
  total: number = 0;
}
