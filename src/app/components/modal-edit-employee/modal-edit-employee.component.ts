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

  credentials: any;

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

  async confirm() {

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
    const day = (datetime.getDate() + 1).toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    data['birth_date'] = formattedDate;

    if (this.selectedImageDataUrl) {
      //si se toma una nueva foto
      console.log(this.fileBlob);

      data['image'] = this.fileBlob;

    } else {

      if (this.employeeAvatar != null) {

        const fileBlob = await this.loadImageFromUrlAndConvertToBlob(this.employeeAvatar);

        console.log(fileBlob)

        data['image'] = fileBlob;

      } else if (this.fileBlob !== null) {

        console.log(this.fileBlob)

        data['image'] = this.fileBlob;

      }

    }

    this.modalCtrl.dismiss(data, 'confirm');
  }

  async loadImageFromUrlAndConvertToBlob(imageUrl: string): Promise<File | null> {
    try {

      // Realizar una solicitud HTTP para obtener la imagen desde la URL
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error(`No se pudo cargar la imagen: ${response.status} - ${response.statusText}`);
      }

      // Convertir la respuesta de la imagen a una matriz de bytes (Uint8Array)
      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Crear un Blob a partir de la matriz de bytes
      const imageBlob = new Blob([uint8Array], { type: 'image/jpeg' });

      // Crear un archivo (File) a partir del Blob
      const fileName = '1.jpeg';
      const fileBlob = new File([imageBlob], fileName, { type: 'image/jpeg' });

      return fileBlob;

    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      return null; // Devolver null en caso de error
    }
  }


  // create an instance of ProductModel instance by name variable model

  // set the product name with custom value as below on ngOninit fuction
  ngOnInit ():void {

    this.credentials = this.formBuilder.nonNullable.group({

      email: [this.employeeEmail, [Validators.required, Validators.email]],
      name: [this.employeeName, [Validators.required, this.onlyLetters]],
      middle_name: [this.employeeFirstName, [Validators.required, this.onlyLetters]],
      last_name: [this.employeeLastName, [Validators.required, this.onlyLetters]],
      phone: [this.employeePhone, [Validators.required, Validators.pattern('[0-9]{10}')]],
      num_control: [this.employeeControlNumber, [Validators.required]],
      gender: [this.employeeGender, [Validators.required]],
      birth_date: [this.employeeBirthDate, [Validators.required]],

    });

  }

}
