import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturaListaComponent } from './factura-lista/factura-lista.component';
import { FacturaRegistarComponent } from './factura-registar/factura-registar.component';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: 'registrar',
    component: FacturaRegistarComponent
  },
  {
    path: 'listar',
    component: FacturaListaComponent
  },
  {
    path: 'folder',
    component: FolderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
