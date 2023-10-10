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
    phone_number: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],

  });

  constructor(private formBuilder:FormBuilder, private modalCtrl:ModalController)
  {

  }

  ngOnInit() {}

  get name() {
    return this.newProfileInfo.controls.name;
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
