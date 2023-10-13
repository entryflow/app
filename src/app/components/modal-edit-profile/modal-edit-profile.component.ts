import { Component, OnInit } from '@angular/core';
import	{	ModalController	}	from	'@ionic/angular';


import {FormBuilder,FormControl,Validators,FormArray} from '@angular/forms';



@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.scss'],
})


export class ModalEditProfileComponent implements OnInit {

  newProfileInfo = this.formBuilder.nonNullable.group({

    name: ['', [Validators.required, Validators.pattern('[A-Za-z ]+$')]],
    first_name: ['', [Validators.required, Validators.pattern('[A-Za-z ]+$')]],
    second_name: ['', [Validators.required, Validators.pattern('[A-Za-z ]+$')]],
    phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],

  });

  constructor(private formBuilder:FormBuilder, private modalCtrl:ModalController)
  {

  }

  ngOnInit() {}

  get name() {
    return this.newProfileInfo.controls.name;
  }

  get first_name() {
    return this.newProfileInfo.controls.first_name;
  }

  get second_name() {
    return this.newProfileInfo.controls.second_name;
  }

  get phoneNumber() {
    return this.newProfileInfo.controls.phoneNumber;
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
