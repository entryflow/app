import { Component } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { ModalCreateEmployeeComponent } from '../components/modal-create-employee/modal-create-employee.component';
import { ModalEditEmployeeComponent } from '../components/modal-edit-employee/modal-edit-employee.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  
  constructor(private alertController:AlertController,private modalController:ModalController) {}

  //Funcion para mostrar alert 
  async onAlert(){ 
    const alert = await this.alertController.create({
      header: 'Eliminar empleado',
      subHeader: '',
      message: '¿Estas seguro de eliminar el empleado John Doe Ipsum?',
      buttons: ['Cancelar','Aceptar'],
      mode:'ios'
    });

    await alert.present();
  }

  //Funcion para mostrar modal
  async onModalCreate(){
    const modal = await this.modalController.create({
      component: ModalCreateEmployeeComponent,
      mode:'ios'
    });

    return await modal.present();
  }
  
  async onModalEdit(){
    const modal = await this.modalController.create({
      component: ModalEditEmployeeComponent,
      mode:'ios'
    });

    return await modal.present();
  }
}
