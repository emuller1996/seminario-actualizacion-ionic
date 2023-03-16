import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Registra Factura', url: '/facturas/registrar', icon: 'mail' },
    { title: 'Listas Factura', url: '/facturas/listar', icon: 'paper-plane' },
    { title: 'Productos', url: '/productos/', icon: 'paper-plane' },
      
  ];
  
  constructor() {}
}
