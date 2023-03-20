import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoListaComponent } from './producto-lista/producto-lista.component';
import { ProductoCrearComponent } from './producto-crear/producto-crear.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductoListaComponent,
    ProductoCrearComponent,
    CategoriaComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    IonicModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductoModule { }
