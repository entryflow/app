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

  public employees: any = [];

  public searchTerm: string = '';

  public originalEmployees: any =[]; // Copia de la lista original de empleados

  public results: any = [];


  handleInput(event: any) {

    const searchTerm = event.detail.value.toLowerCase();

    if (!searchTerm || searchTerm === '') {
      // Si el término de búsqueda está vacío, muestra la lista completa.
      this.employees = this.originalEmployees;
    } else {
      // Filtra la lista original de empleados en función del término de búsqueda.
      this.employees = this.originalEmployees.filter((employee: { name: any; middle_name: any; last_name: any; }) => {
        const fullName = `${employee.name} ${employee.middle_name} ${employee.last_name}`.toLowerCase();
        return fullName.includes(searchTerm);
      });
    }

  }

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

    this.originalEmployees = await this.api.getEmployees(1);

    this.employees = [...this.originalEmployees];

  }

  //Funcion para mostrar alert
  async onAlert(id: any,name: any, middle_name: any, last_name: any) {

    const alert = await this.alertController.create({
      header: 'Eliminar empleado',
      subHeader: '',
      message: '¿Estas seguro de eliminar a ' + name + ' ' + middle_name + ' ' + last_name + '?',
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

  async onModalEdit(employeeName: any, employeeFirstName: any, employeeLastName: any, employeePhone: any, employeeEmail: any, employeeControlNumber: any, employeeGender: any, employeeBirthDate: any, employeeAvatar: any, employeeID: any) {

    console.log(employeeName, employeeFirstName, employeeLastName, employeePhone, employeeEmail, employeeControlNumber, employeeGender, employeeBirthDate, employeeAvatar, employeeID);

    const modal = await this.modalController.create({
      component: ModalEditEmployeeComponent,
      animated: true,
      mode: 'ios',
      componentProps: {
        employeeName: employeeName,
        employeeFirstName: employeeFirstName,
        employeeLastName: employeeLastName,
        employeePhone: employeePhone,
        employeeEmail: employeeEmail,
        employeeControlNumber: employeeControlNumber,
        employeeGender: employeeGender,
        employeeBirthDate: employeeBirthDate,
        employeeAvatar: employeeAvatar,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      const loading = await this.LoadingController.create({
        message: 'Cargando...',
        mode: 'ios',
      }).then(async (loadingElement) => {
        loadingElement.present();
        await this.api.updateEmployees(data, employeeID);
        const toast = await this.toastController.create({
          message: 'Empleado editado correctamente',
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

  async onModalViewEmployeeInfo(employeeName: any, employeeFirstName: any, employeeLastName: any, employeePhone: any, employeeEmail: any, employeeControlNumber: any, employeeGender: any, employeeBirthDate: any, employeeAvatar: any) {

      const modal = await this.modalController.create({
        component: ModalViewEmployeeInfoComponent,
        mode: 'ios',
        componentProps: {
          employeeName: employeeName,
          employeeFirstName: employeeFirstName,
          employeeLastName: employeeLastName,
          employeePhone: employeePhone,
          employeeEmail: employeeEmail,
          employeeControlNumber: employeeControlNumber,
          employeeGender: employeeGender,
          employeeBirthDate: employeeBirthDate,
          employeeAvatar: employeeAvatar,
        },
      });

      return await modal.present();

  }

}
