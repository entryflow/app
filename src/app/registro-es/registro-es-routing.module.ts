import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroESPage } from './registro-es.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroESPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroESPageRoutingModule {}
