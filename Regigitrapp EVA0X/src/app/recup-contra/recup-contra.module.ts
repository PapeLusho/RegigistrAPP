import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecupContraPageRoutingModule } from './recup-contra-routing.module';

import { RecupContraPage } from './recup-contra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RecupContraPageRoutingModule
  ],
  declarations: [RecupContraPage]
})
export class RecupContraPageModule {}
