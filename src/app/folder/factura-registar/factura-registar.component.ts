import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';
import { Observable, async } from 'rxjs';
import { Factura } from 'src/app/models/factura.model';
import { ProductoFactura } from 'src/app/models/facturadetail.model';
import { Producto } from 'src/app/models/product.models';
import { FacturaService } from 'src/app/services/factura.service';
import { loginService } from 'src/app/services/login.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-factura-registar',
  templateUrl: './factura-registar.component.html',
  styleUrls: ['./factura-registar.component.scss'],
})
export class FacturaRegistarComponent implements OnInit {
  nombre: string = '';
  listaProductos: Producto[] = [];
  listaProductosFactura: ProductoFactura[] = [];
  totalFactura: number = 0;
  listaProductosObservable: Observable<Producto[]> = new Observable();
  constructor(
    private serviceProducto: ProductoService,
    private facturaService: FacturaService,
    private toastController: ToastController,
    public loginService: loginService
  ) {}

  ngOnInit() {
    console.log('Monte');
    this.getProductByName(this.nombre);
  }

  onIonInfinite(){
    console.log('nada')
  }

  async getProductByName(name:string) {
    //this.listaProductosObservable = this.serviceProducto.getAllProductos();
    this.serviceProducto.getAllProductosXNombre(name).subscribe({
      next: (data) => {
        this.listaProductos = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async onSaveFactura(): Promise<void> {

    const { value } = await Preferences.get({ key: 'token' });



    if(value)
    this.loginService.QsoyYo(value).then(async (res)=>{



      const s =  await this.facturaService.saveFacturaTwo(
        {
          total: this.totalFactura,
          subtotal: this.totalFactura,
          fecha: new Date().toISOString(),
          hora: `${new Date().getHours()}:${new Date().getMinutes()}`,
          UserId :res.data
        },
        this.listaProductosFactura
      )
      console.log(s)
      if(s){
        this.listaProductosFactura = []
        const toast = await this.toastController.create({
          message: 'Factura Registrada!',
          duration: 1500,
          position: 'top',
        });
        await toast.present();
        this.totalFactura=0
      }



    })



  }

  onChangeNameProduct() {
    console.log(this.nombre);
    this.getProductByName(this.nombre)
  }

  onChangeCantidadProducto(id: number) {
    let s = this.listaProductosFactura.find((p) => p.idProducto === id);
    console.log(s);
    this.listaProductosFactura.forEach((p) => {
      if (p.idProducto === id) {
        p.valorTotal = p.cantidad * p.valorUnitario;
        this.getTotal();
      }
    });
  }

  getTotal() {
    this.totalFactura = this.listaProductosFactura.reduce(
      (next, current) => next + current.valorTotal,
      0
    );
    console.log(this.totalFactura);
  }

  onAddProduct(e: Producto) {
    var ca = this.listaProductosFactura.find((c) => c.idProducto === e.id);
    if (!ca) {
      this.listaProductosFactura.push({
        idProducto: e.id,
        nombre: e.nombre,
        cantidad: 1,
        valorUnitario: e.precio,
        valorTotal: e.precio * 1,
      });
      this.getTotal();
    }
  }
}
