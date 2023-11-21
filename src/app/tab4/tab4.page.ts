import { Component, OnInit } from '@angular/core';
import { ModalController,AlertController,LoadingController } from '@ionic/angular';
import { ModalEditProfileComponent } from '../components/modal-edit-profile/modal-edit-profile.component';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';



import {
  ToastController,
} from '@ionic/angular';



@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

    profile:any = [];

  constructor(
    private alertController:AlertController,
    private modalController:ModalController,
    private api:ApiService,
    private router:Router,
    private loadingController:LoadingController,
    private toastController: ToastController

    )
  {}

  ngOnInit() {}

  async ionViewWillEnter(){

    this.profile = [];

    const loading = this.loadingController.create({
      message:'Cargando...',
      mode:'ios'
    }).then(async (loadingElement)=>{

      loadingElement.present();

      this.refreshProfile();

      loadingElement.dismiss();

    });

  }

  async refreshProfile(){
    let token:any = await this.api.getToken();

      this.profile = await this.api.getUserInfo(token);

      this.profile = this.profile.user;

      this.profile.company = this.profile.company.name;

      console.log(this.profile);
  }

  async onAlert(){

    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      subHeader: '',
      message: '¿Desea cerrar la sesión?',
      buttons: [{
        text:'Cancelar',
        role:'cancel'
      },{
        text:'Aceptar',
        handler:()=>{
          this.logout();
        }
      }],
      mode:'ios'
    });



    await alert.present();

  }

  async onModalEdit(){

    const modal = await this.modalController.create({
      component: ModalEditProfileComponent,
      mode:'ios',
      componentProps: {
        profileId: this.profile.id,
        profileName: this.profile.name,
        profileMiddleName: this.profile.middle_name,
        profileLastName: this.profile.last_name,
        profileEmail: this.profile.email,
        profileAvatar: this.profile.avatar,

      }

    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      const loading = await this.loadingController.create({
        message: 'Cargando...',
        mode: 'ios',
      }).then(async (loadingElement) => {
        loadingElement.present();
        await this.api.updateProfile(data);
        const toast = await this.toastController.create({
          message: 'Perfil editado correctamente',
          duration: 2000,
          mode: 'ios',
          color: 'success',
          position: 'top',
          animated: true,
        });

        await this.refreshProfile();

        await toast.present();

        loadingElement.dismiss();

      });
    }

  }

  async logout(){
    const loading = await this.loadingController.create({
      message: 'Cerrando sesión...',
      mode:'ios'
    }).then(async (loadingElement) => {
      loadingElement.present();
      await this.api.deleteToken();
      this.router.navigateByUrl('/auth/login', { replaceUrl: true });
      loadingElement.dismiss();
    });

  }




}
