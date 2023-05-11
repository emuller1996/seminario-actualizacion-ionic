import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura } from '../models/factura.model';
import { ProductoFactura } from '../models/facturadetail.model';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  URL_BASE: String = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) {}

  saveFactura(f: any, p: ProductoFactura[]) {
    //console.log(f);
    //console.log(p);
    var idFAct: number;
    return this.http
      .post<{ id: number }>(`${this.URL_BASE}/facturas`, f)
      .subscribe({
        next: async (data) => {
          //console.error(data);
          idFAct = data.id;
          p.map(async (pf) => {
            //console.error(pf);
            this.http
              .post(`${this.URL_BASE}/facturas/${idFAct}/factura-productos`, pf)
              .subscribe({
                next: async (data) => {
                  //console.log(data);

                  const toast = await this.toastController.create({
                    message: 'Factura Registrada!',
                    duration: 1500,
                    position: 'top',
                  });
                  await toast.present();
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

  async saveFacturaTwo(f: any, p: ProductoFactura[]) {
    //console.log(f);
    //console.log(p);

    try {
      var idFAct: any;

      const result = await this.http
        .post<{ id: number }>(`${this.URL_BASE}/facturas`, f)
        .toPromise();

      console.log(result);
      idFAct = result?.id;

      const primises = p.map(async (pf) => {
        //console.error(pf);
        return this.http
          .post(`${this.URL_BASE}/facturas/${idFAct}/factura-productos`, pf)
          .toPromise();
      });

      await Promise.all(primises);
      console.log(primises);
      return true;
    } catch (error) {
      return false;
    }
  }

  getFacturaByDayByUser( id:string ) {


    var filterObject = {
      where: {
        fecha: { gt: `${new Date().toJSON().substring(0, 11)}00:00:00.000Z` },
        UserId : id
      },
      include: [
        {
          relation: 'FACTURAPRODUCTOS',
        },
        {
          relation : 'USER'
        }
      ],
    };
    const filter = JSON.stringify(filterObject);
    var str = new URLSearchParams(filter).toString();
    str = str.substring(0, str.length - 1);

    return this.http.get<Factura[]>(`${this.URL_BASE}/facturas?filter=${str}`);
  }
}
