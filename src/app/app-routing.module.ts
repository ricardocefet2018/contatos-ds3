import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contato',
    pathMatch: 'full',
  },
  {
    path: 'contato',
    loadChildren: () =>
      import('./pages/contato/contato.module').then((m) => m.ContatoPageModule),
  },
  {
    path: 'add-contato',
    loadChildren: () =>
      import('./pages/add-contato/add-contato.module').then(
        (m) => m.AddContatoPageModule
      ),
  },
  {
    path: 'add-contato/:id',
    loadChildren: () =>
      import('./pages/add-contato/add-contato.module').then(
        (m) => m.AddContatoPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
