import { Component, OnInit } from '@angular/core';
import	{	ModalController	}	from	'@ionic/angular';


import {FormBuilder,FormControl,Validators,FormArray} from '@angular/forms';



@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.scss'],
})


export class ModalEditProfileComponent implements OnInit {

  public selectedImageDataUrl: any;

  onlyLetters =  Validators.pattern('[A-Za-z ]+$|');

  public profileName?: any;
  public profileMiddleName?: any;
  public profileLastName?: any;
  public profileEmail?: any;
  public profileAvatar?: any;


  newProfileInfo = this.formBuilder.nonNullable.group({

    name: ['', [Validators.required, this.onlyLetters]],
    middle_name: ['', [Validators.required, this.onlyLetters]],
    last_name: ['', [Validators.required, this.onlyLetters]],
    email: ['', [Validators.required, Validators.email]],

  });

  constructor(private formBuilder:FormBuilder, private modalCtrl:ModalController)
  {

  }

  takePicture(){

  }

  ngOnInit() {}

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

  confirm() {
    this.modalCtrl.dismiss(null, 'confirm');
  }

  // async save() {
  //   console.log(this.newProfileInfo.value);
  // }

}
