import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,Validators,FormArray} from '@angular/forms';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { ToastController,LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {
  step: number = 1;
  selectedImageDataUrl!: any;
  fileBlob!: File;
  imageError:boolean = false;

  credentials = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    middle_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    num_control: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    company_key: ['', [Validators.required]],
    company: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder,private api:ApiService,
    private toastController:ToastController,private loadingController:LoadingController,
    private router:Router) { }

  get email() {
    return this.credentials.controls.email;
  }
  get name() {
    return this.credentials.controls.name;
  }
  get middle_name() {
    return this.credentials.controls.middle_name;
  }
  get last_name() {
    return this.credentials.controls.last_name;
  }
  get phone() {
    return this.credentials.controls.phone;
  }
  get num_control() {
    return this.credentials.controls.num_control;
  }
  get password() {
    return this.credentials.controls.password;
  }
  get company_key() {
    return this.credentials.controls.company_key;
  }
  
  goToLogin(){
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }

  ngOnInit() {}

  nextStep() {
    if (this.step < 4) {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  async step2() {
    try {
      let company:any = await this.api.getCompanyID(this.company_key.value);

      this.credentials.patchValue({
        company:company.id
      });
      this.toastController.create({
        message: 'Compañia '+company.name+' encontrada',
        duration: 2000,
        mode:'ios',
        color:'success',
        position:'top',
        animated:true
      }).then((toast) => {
        toast.present();
        this.nextStep();
        console.log(this.credentials.value);
      });
    }
    catch (error){
      this.toastController.create({
        message: 'Compañia no encontrada',
        duration: 2000,
        mode:'ios',
        color:'danger',
        position:'top',
        animated:true
      }).then((toast) => {
        toast.present();
      });
    }
  }

  step3(){
    try{
      if (this.fileBlob.name == "1.jpeg"){
        
        this.imageError  = false;
        this.nextStep();
      }
      
    }
    catch(error){
      this.imageError = true;
      
    }
  }

  async takePicture() {
    try{
      const image = await Camera.getPhoto({
        quality: 100,
        presentationStyle: 'fullscreen',
        resultType: CameraResultType.DataUrl
      });
  
      this.selectedImageDataUrl = image.dataUrl;
      
  
      const imageBlob = this.dataURItoBlob(image.dataUrl);
      this.fileBlob = new File([imageBlob], "1.jpeg", { type: 'image/jpeg' });
    }
    catch(error){
      console.log(error);
    }
    
  }

  dataURItoBlob(dataURI: any) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }

  async signup(){
    let data: any = [];
    data['name'] = this.credentials.value['name'];
    data['middle_name'] = this.credentials.value['middle_name'];
    data['last_name'] = this.credentials.value['last_name'];
    data['email'] = this.credentials.value['email'];
    data['password'] = this.credentials.value['password'];
    data['phone'] = this.credentials.value['phone'];
    data['company'] = this.credentials.value['company'];

    if (this.selectedImageDataUrl) {
      data['image'] = this.fileBlob;
    }
    
    const loading = await this.loadingController.create({
      message: 'Registrando usuario...',
      mode:'ios'
    }).then(async (loadingElement) => {
      loadingElement.present();
      try{
        let result:any = await this.api.signUp(data);
       
        if(result.access_token){
          await this.api.setToken(result.access_token);
          this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
        }
      }
      catch(error){
        console.log(error);
        throw error;
      }
      loadingElement.dismiss();
    });
  }
}
