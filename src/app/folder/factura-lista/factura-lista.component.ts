import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/factura.model';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-factura-lista',
  templateUrl: './factura-lista.component.html',
  styleUrls: ['./factura-lista.component.scss'],
})
export class FacturaListaComponent  implements OnInit {

  listaFactura : Factura[]=[];


  constructor(private facturaService: FacturaService ) { }

  ngOnInit() {
    console.log(new Date().toJSON().substring(0,11)+"00:00:00.000Z")
  this.facturaService.getFacturaByDay().subscribe(data => {
    this.listaFactura = data
    console.log(data)})
  }

}
