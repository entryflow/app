import { Component, OnInit } from '@angular/core';
import	{	ModalController	}	from	'@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';

import {FormBuilder,FormControl,Validators,FormArray} from '@angular/forms';



@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.scss'],
})


export class ModalEditProfileComponent implements OnInit {


  fileBlob!: File;
  public selectedImageDataUrl: any;

  onlyLetters =  Validators.pattern(/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/);

  public profileId?: any;
  public profileName?: any;
  public profileMiddleName?: any;
  public profileLastName?: any;
  public profileEmail?: any;
  public profileAvatar?: any;

  newProfileInfo: any;

  constructor(private formBuilder:FormBuilder, private modalCtrl:ModalController)
  {

  }

  async takePicture(){

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

  ngOnInit ():void {

    this.newProfileInfo = this.formBuilder.nonNullable.group({
      name: ['', [Validators.required, this.onlyLetters]],
      middle_name: ['', [Validators.required, this.onlyLetters]],
      last_name: ['', [Validators.required, this.onlyLetters]],
      email: [this.profileEmail, [Validators.required, Validators.email]],
    });

  }

  get name() {
    return this.newProfileInfo.controls.name;
  }

  get middle_name() {
    return this.newProfileInfo.controls.middle_name;
  }

  get last_name() {
    return this.newProfileInfo.controls.last_name;
  }

  get email(){
    return this.newProfileInfo.controls.email;
  }


  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {

    let data: any = [];

    data['id'] = this.profileId;
    data['email'] = this.newProfileInfo.value['email'];
    data['name'] = this.newProfileInfo.value['name'];
    data['middle_name'] = this.newProfileInfo.value['middle_name'];
    data['last_name'] = this.newProfileInfo.value['last_name'];


    if (this.selectedImageDataUrl) {
      //si se toma una nueva foto
      console.log(this.fileBlob);
      data['image'] = this.fileBlob;

    } else {

      if (this.profileAvatar != null) {

        const fileBlob = await this.loadImageFromUrlAndConvertToBlob(this.profileAvatar);

        console.log(fileBlob)

        data['image'] = fileBlob;

      } else if (this.fileBlob !== null) {

        console.log(this.fileBlob)

        data['image'] = this.fileBlob;

      }

    }

    this.modalCtrl.dismiss(data, 'confirm');
  }



  // async save() {
  //   console.log(this.newProfileInfo.value);
  // }

}
