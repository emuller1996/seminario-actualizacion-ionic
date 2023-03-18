import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoListaComponent } from './producto-lista/producto-lista.component';
import { ProductoCrearComponent } from './producto-crear/producto-crear.component';


@NgModule({
  declarations: [
    ProductoListaComponent,
    ProductoCrearComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    IonicModule
  ]
})
export class ProductoModule { }
