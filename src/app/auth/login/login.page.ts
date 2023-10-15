import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,Validators,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  credentials = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  constructor(private fb: FormBuilder,private router:Router,private api:ApiService,
    private toastController:ToastController,private loadingController:LoadingController) { }

  ngOnInit() {}

  get email() {
    return this.credentials.controls.email;
  }

  get password() {
    return this.credentials.controls.password;
  }

  async login() {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      mode:'ios'
    }).then(async (loadingElement) => {
      loadingElement.present();
     
    try{
      const data:any = await this.api.login(this.credentials.value);
      console.log(data);
      if(data.access_token){
        await this.api.setToken(data.access_token);
        this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
      }
    } catch(error){
      console.log(error);
      this.toastController.create({
        message: 'Usuario o contraseña incorrectos',
        duration: 2000,
        mode:'ios',
        color:'danger',
        position:'top',
        animated:true
      }).then((toast) => {
        toast.present();
      });
    }
      loadingElement.dismiss();
    });
   
    

  }

  
}
