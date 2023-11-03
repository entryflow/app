import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroESPageRoutingModule } from './registro-es-routing.module';

import { RegistroESPage } from './registro-es.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroESPageRoutingModule
  ],
  declarations: [RegistroESPage]
})
export class RegistroESPageModule {}
