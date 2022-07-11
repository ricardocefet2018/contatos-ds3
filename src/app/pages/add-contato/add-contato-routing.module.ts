import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddContatoPage } from './add-contato.page';

const routes: Routes = [
  {
    path: '',
    component: AddContatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddContatoPageRoutingModule {}
