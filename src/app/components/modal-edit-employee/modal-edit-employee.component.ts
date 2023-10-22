import { Component, OnInit, ViewChild  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {FormBuilder,FormControl,Validators,FormArray} from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';

import {NavController} from '@ionic/angular';

import { IonContent } from '@ionic/angular';



@Component({
  selector: 'app-modal-edit-employee',
  templateUrl: './modal-edit-employee.component.html',
  styleUrls: ['./modal-edit-employee.component.scss'],
})

export class ModalEditEmployeeComponent  implements OnInit {

  @ViewChild(IonContent) content?: IonContent;
  selectedImageDataUrl!: any;
  fileBlob!: File;

  public employeeName?: string;
  public employeeFirstName?: string;
  public employeeLastName?: string;
  public employeePhone?: string;
  public employeeEmail?: string;
  public employeeControlNumber?: string;
  public employeeGender?: string;
  public employeeBirthDate?: string;
  public employeeAvatar?: string;

  constructor(private modalCtrl:ModalController, private formBuilder:FormBuilder) {

   }

  onlyLetters =  Validators.pattern(/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/);

  credentials = this.formBuilder.nonNullable.group({

    email: [this.employeeEmail, [Validators.required, Validators.email]],
    name: [this.employeeName, [Validators.required, this.onlyLetters]],
    middle_name: [this.employeeFirstName, [Validators.required, this.onlyLetters]],
    last_name: [this.employeeLastName, [Validators.required, this.onlyLetters]],
    phone: [this.employeePhone, [Validators.required, Validators.pattern('[0-9]{10}')]],
    num_control: [this.employeeControlNumber, [Validators.required]],
    gender: [this.employeeGender, [Validators.required]],
    birth_date: [this.employeeBirthDate, [Validators.required]],

  });

  ionViewWillEnter(){
    document.getElementById('datetime')?.setAttribute('value', this.employeeBirthDate!);
  }

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
  get gender(){
    return this.credentials.controls.gender;
  }
  get birth_date(){
    return this.credentials.controls.birth_date;
  }

  scrollToAccordion() {
    console.log('scrolling');
    this.content?.scrollToPoint(0, window.innerHeight, 500);
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

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    let data: any = [];
    data['email'] = this.credentials.value['email'];
    data['name'] = this.credentials.value['name'];
    data['middle_name'] = this.credentials.value['middle_name'];
    data['last_name'] = this.credentials.value['last_name'];
    data['phone'] = this.credentials.value['phone'];
    data['num_control'] = this.credentials.value['num_control'];
    data['gender'] = this.credentials.value['gender'];

    let date:any = this.credentials.value['birth_date'];
    let datetime  = new Date(date);
    const year = datetime.getFullYear();
    const month = (datetime.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const day = datetime.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    data['birth_date'] = formattedDate;

    if (this.selectedImageDataUrl) {
      data['image'] = this.fileBlob;
    }

    this.modalCtrl.dismiss(data, 'confirm');
  }

  // create an instance of ProductModel instance by name variable model

  // set the product name with custom value as below on ngOninit fuction
  ngOnInit ():void {}

}
