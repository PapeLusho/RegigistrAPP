import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPPageRoutingModule } from './inicio-p-routing.module';

import { InicioPPage } from './inicio-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPPageRoutingModule
  ],
  declarations: [InicioPPage]
})
export class InicioPPageModule {}
