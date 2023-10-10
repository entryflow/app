import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ModalEditProfileComponent } from '../components/modal-edit-profile/modal-edit-profile.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private alertController:AlertController,private modalController:ModalController)
  {  }

  ngOnInit() {

  }

  async onAlert(){

    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      subHeader: '',
      message: '¿Desea cerrar la sesión?',
      buttons: ['Cancelar','Aceptar'],
      mode:'ios'
    });

    await alert.present();
  }

  async onModalEdit(){
    const modal = await this.modalController.create({
      component: ModalEditProfileComponent,
      mode:'ios'
    });

    return await modal.present();
  }

}
