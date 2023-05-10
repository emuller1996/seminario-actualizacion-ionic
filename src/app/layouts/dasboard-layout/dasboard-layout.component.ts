import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dasboard-layout',
  templateUrl: './dasboard-layout.component.html',
  styleUrls: ['./dasboard-layout.component.scss'],
})
export class DasboardLayoutComponent  implements OnInit {
  public appPages = [
    { title: 'Registra Factura', url: '/facturas/registrar', icon: 'mail' },
    { title: 'Listas Factura', url: '/facturas/listar', icon: 'paper-plane' },
    { title: 'Productos', url: '/productos/', icon: 'paper-plane' },
  ];

  constructor() { }

  ngOnInit() {}

}
