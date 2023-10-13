import { Component } from '@angular/core';
import { AlertController,ModalController,LoadingController } from '@ionic/angular';
import { ModalCreateEmployeeComponent } from '../components/modal-create-employee/modal-create-employee.component';
import { ModalEditEmployeeComponent } from '../components/modal-edit-employee/modal-edit-employee.component';
import { ModalEditProfileComponent } from '../components/modal-edit-profile/modal-edit-profile.component';
import { ModalViewEmployeeInfoComponent } from '../components/modal-view-employee-info/modal-view-employee-info.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  employees:any = [];

  constructor(private alertController:AlertController,
    private modalController:ModalController,
    private api:ApiService,
    private LoadingController:LoadingController
    ) {}

    async ionViewWillEnter(){
      const loading = await this.LoadingController.create({
        message:'Cargando...',
        mode:'ios'
      }).then(async (loadingElement)=>{
        loadingElement.present();
        this.refreshEmployees();

        loadingElement.dismiss();
      });
    }
    async refreshEmployees(){
      this.employees = await this.api.getEmployees(1);
    }
  //Funcion para mostrar alert
  async onAlert(id:any){
    const alert = await this.alertController.create({
      header: 'Eliminar empleado',
      subHeader: '',
      message: '¿Estas seguro de eliminar el empleado John Doe Ipsum?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        },
      },
        {
        text: 'Aceptar',
        handler: async () => {
          this.api.deleteEmployees(id);
          this.refreshEmployees();
        },
      }],
      mode:'ios',

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

  async onModalEdit(id:any){
    const modal = await this.modalController.create({
      component: ModalEditEmployeeComponent,
      mode:'ios'
    });



    return await modal.present();
  }

  async onModalViewEmployeeInfo(){
    const modal = await this.modalController.create({
      component: ModalViewEmployeeInfoComponent,
      mode:'ios'
    });
    return await modal.present();
  }

}
