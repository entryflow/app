import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-modal-create-employee',
  templateUrl: './modal-create-employee.component.html',
  styleUrls: ['./modal-create-employee.component.scss'],
})
export class ModalCreateEmployeeComponent implements OnInit {
  selectedImageDataUrl!: any;
  fileBlob!: File;

  credentials = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    middle_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    num_control: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    birth_date: ['', [Validators.required]],
  });

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

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {}

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

    console.log(data);
    this.modalCtrl.dismiss(data, 'confirm');
  }

  async takePicture() {
    const result = await FilePicker.pickImages();
    const file = result.files[0];
    
    if (file.blob) {
      this.fileBlob = new File([file.blob], "1", {
        type: file.mimeType,
    });
  
      // Convert the Blob to a data URL for image display
      const reader = new FileReader();
      reader.onloadend = () => {
        this.selectedImageDataUrl = reader.result as string;
      };
      reader.readAsDataURL(file.blob);
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
  ngOnInit(): void{}
}
