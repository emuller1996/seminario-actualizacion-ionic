import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoCrearComponent } from './producto-crear/producto-crear.component';
import { ProductoListaComponent } from './producto-lista/producto-lista.component';
import { CategoriaComponent } from './categoria/categoria.component';


const routes: Routes = [
{
  path:'',
  component:ProductoListaComponent
},
{
  path:'crear',
  component:ProductoCrearComponent
},
{
  path:'categorias',
  component:CategoriaComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
