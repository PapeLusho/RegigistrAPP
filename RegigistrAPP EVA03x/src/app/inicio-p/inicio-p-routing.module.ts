import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPPage } from './inicio-p.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPPageRoutingModule {}
