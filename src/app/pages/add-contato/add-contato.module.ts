import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddContatoPageRoutingModule } from './add-contato-routing.module';

import { AddContatoPage } from './add-contato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddContatoPageRoutingModule
  ],
  declarations: [AddContatoPage]
})
export class AddContatoPageModule {}
