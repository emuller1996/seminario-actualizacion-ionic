import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Preferences } from '@capacitor/preferences';

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

  public isLogin: boolean = true;

  constructor() {
    /* console.log(JSON.stringify(localStorage.getItem('token')));

    if (JSON.stringify(localStorage.getItem('token')) !== 'null') {
      this.isLogin = true;
    } */

    //this.getToken();

  }

  async getToken(){
    const { value } = await Preferences.get({ key: 'token' });
    console.log(value)
    if(!value){
      this.isLogin = false;
    }else{
      this.isLogin = true;

    }
  }



  async onLogout() {

  }
}
