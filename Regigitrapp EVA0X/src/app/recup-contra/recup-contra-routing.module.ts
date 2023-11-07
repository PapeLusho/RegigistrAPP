import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecupContraPage } from './recup-contra.page';

const routes: Routes = [
  {
    path: '',
    component: RecupContraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecupContraPageRoutingModule {}
