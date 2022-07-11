import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddContatoPageRoutingModule } from './add-contato-routing.module';

import { AddContatoPage } from './add-contato.page';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddContatoPageRoutingModule,
    ReactiveFormsModule,
    BrMaskerModule,
  ],
  declarations: [AddContatoPage],
})
export class AddContatoPageModule {}
