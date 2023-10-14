import { Component, OnInit } from '@angular/core';
import { ModalController,AlertController,LoadingController } from '@ionic/angular';
import { ModalEditProfileComponent } from '../components/modal-edit-profile/modal-edit-profile.component';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private alertController:AlertController,private modalController:ModalController,
    private api:ApiService,private router:Router,private loadingController:LoadingController)
  {  }

  ngOnInit() {

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
      mode:'ios'
    });

    return await modal.present();
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
