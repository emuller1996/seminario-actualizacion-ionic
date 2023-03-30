import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura } from '../models/factura.model';
import { ProductoFactura } from '../models/facturadetail.model';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  URL_BASE: String = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  saveFactura(f: any, p: ProductoFactura[]) {
    console.log(f);
    console.log(p);
    var idFAct: number;
    this.http.post<{ id: number }>(`${this.URL_BASE}/facturas`, f).subscribe({
      next: async (data) => {
        console.error(data);
        idFAct = data.id;
        p.map((pf) => {
          console.error(pf);
          this.http.post(`${this.URL_BASE}/facturas/${idFAct}/factura-productos`, pf).subscribe({
            next: async (data) => {
              console.log(data);
            },
            error: async (err) => {
              console.log(err);
            },
          });
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
