import { Component } from '@angular/core';
import {
  AlertController,
  ModalController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { ModalCreateEmployeeComponent } from '../components/modal-create-employee/modal-create-employee.component';
import { ModalEditEmployeeComponent } from '../components/modal-edit-employee/modal-edit-employee.component';
import { ModalEditProfileComponent } from '../components/modal-edit-profile/modal-edit-profile.component';
import { ModalViewEmployeeInfoComponent } from '../components/modal-view-employee-info/modal-view-employee-info.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  employees: any = [];

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private api: ApiService,
    private LoadingController: LoadingController,
    private toastController: ToastController
  ) {}

  async ionViewWillEnter() {
    const loading = await this.LoadingController.create({
      message: 'Cargando...',
      mode: 'ios',
    }).then(async (loadingElement) => {
      loadingElement.present();
      this.refreshEmployees();

      loadingElement.dismiss();
    });
  }

  async refreshEmployees() {
    this.employees = [];
    this.employees = await this.api.getEmployees(1);
  }

  //Funcion para mostrar alert
  async onAlert(id: any,name: any, middle_name: any, last_name: any) {
    const alert = await this.alertController.create({
      header: 'Eliminar empleado',
      subHeader: '',
      message: '¿Estas seguro de eliminar a ' + name + ' ' + middle_name + ' ' + last_name + '',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Aceptar',
          handler: async () => {
            const loading = await this.LoadingController.create({
              message: 'Cargando...',
              mode: 'ios',
            }).then(async (loadingElement) => {
              await alert.dismiss();
              loadingElement.present();
              await this.api.deleteEmployees(id);
              await this.refreshEmployees();
              const toast = await this.toastController.create({
                message: 'Empleado eliminado correctamente',
                duration: 2000,
                mode: 'ios',
                color: 'success',
                position: 'top',
                animated: true,
              });
              
              
      
              loadingElement.dismiss();
              await toast.present();
            });

            
          },
        },
      ],
      mode: 'ios',
    });

    await alert.present();
  }

  //Funcion para mostrar modal
  async onModalCreate() {
    const modal = await this.modalController.create({
      component: ModalCreateEmployeeComponent,
      animated: true,
      mode: 'ios',
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      const loading = await this.LoadingController.create({
        message: 'Cargando...',
        mode: 'ios',
      }).then(async (loadingElement) => {
        loadingElement.present();
        await this.api.createEmployees(data);
        const toast = await this.toastController.create({
          message: 'Empleado creado correctamente',
          duration: 2000,
          mode: 'ios',
          color: 'success',
          position: 'top',
          animated: true,
        });
        await this.refreshEmployees();
        
        await toast.present();
        loadingElement.dismiss();
      });
    }

  }

  async onModalEdit(id: any) {
    const modal = await this.modalController.create({
      component: ModalEditEmployeeComponent,
      animated: true,
      mode: 'ios',
    });

    return await modal.present();
  }

  async onModalViewEmployeeInfo() {
    const modal = await this.modalController.create({
      component: ModalViewEmployeeInfoComponent,
      mode: 'ios',
    });
    return await modal.present();
  }
}
