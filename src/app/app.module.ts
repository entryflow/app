import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Se importa el componente modal para poder usarlo
import { ModalCreateEmployeeComponent } from './components/modal-create-employee/modal-create-employee.component';
import { ModalEditEmployeeComponent } from './components/modal-edit-employee/modal-edit-employee.component';
import { ModalEditProfileComponent } from './components/modal-edit-profile/modal-edit-profile.component';


@NgModule({
  declarations: [AppComponent,ModalCreateEmployeeComponent,ModalEditEmployeeComponent,ModalEditProfileComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
