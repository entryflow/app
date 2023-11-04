import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Se importa el componente modal para poder usarlo
import { HttpClientModule } from  '@angular/common/http';

import { NgApexchartsModule } from "ng-apexcharts";

import fetch from 'isomorphic-unfetch'


import { ModalCreateEmployeeComponent } from './components/modal-create-employee/modal-create-employee.component';
import { ModalEditEmployeeComponent } from './components/modal-edit-employee/modal-edit-employee.component';
import { ModalEditProfileComponent } from './components/modal-edit-profile/modal-edit-profile.component';
import { ModalViewEmployeeInfoComponent } from './components/modal-view-employee-info/modal-view-employee-info.component';
import { ModalRegEntryNExitComponent } from './components/modal-reg-entry-n-exit/modal-reg-entry-n-exit.component';
import { ModalTestComponent } from './components/modal-test/modal-test.component';



@NgModule({

  declarations: [
    AppComponent,
    ModalCreateEmployeeComponent,
    ModalEditEmployeeComponent,
    ModalEditProfileComponent,
    ModalViewEmployeeInfoComponent,
    ModalCreateEmployeeComponent,
    ModalRegEntryNExitComponent,
    ModalTestComponent
  ],

  imports: [
     BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     ReactiveFormsModule,
     FormsModule,
     ReactiveFormsModule,
     NgApexchartsModule,
     HttpClientModule,

    ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],

  bootstrap: [AppComponent],

})

export class AppModule {}
