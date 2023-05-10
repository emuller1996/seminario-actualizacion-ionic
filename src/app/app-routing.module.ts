import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DasboardLayoutComponent } from './layouts/dasboard-layout/dasboard-layout.component';
import { ProductoListaComponent } from './producto/producto-lista/producto-lista.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',                       // {1}
    component: DasboardLayoutComponent,
    children: [
      {
        path: '',
        component: ProductoListaComponent   // {3}
      },
      {
        path: 'facturas',
        loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
      },
      {
        path: 'productos',
        loadChildren: () => import('./producto/producto.module').then( m => m.ProductoModule)
      }
    ]
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
