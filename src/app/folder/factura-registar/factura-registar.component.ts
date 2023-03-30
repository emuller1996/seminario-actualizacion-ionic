import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from 'src/app/models/factura.model';
import { ProductoFactura } from 'src/app/models/facturadetail.model';
import { Producto } from 'src/app/models/product.models';
import { FacturaService } from 'src/app/services/factura.service';
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
    private facturaService: FacturaService
  ) {}

  ngOnInit() {
    console.log('Monte');
    this.getProductByName();
  }

  async getProductByName() {
    this.listaProductosObservable = this.serviceProducto.getAllProductos();
    this.serviceProducto.getAllProductosXNombre('').subscribe({
      next: (data) => {
        this.listaProductos = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSaveFactura(): void {
    this.facturaService.saveFactura(
      {
        total: this.totalFactura,
        subtotal: this.totalFactura,
        fecha: new Date().toISOString(),
        hora: '20:00',
      },
      this.listaProductosFactura
    );
  }

  onChangeNameProduct() {
    console.log(this.nombre);
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
