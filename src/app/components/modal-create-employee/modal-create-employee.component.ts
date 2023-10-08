import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-create-employee',
  templateUrl: './modal-create-employee.component.html',
  styleUrls: ['./modal-create-employee.component.scss'],
})

export class ModalCreateEmployeeComponent  implements OnInit {
  
  constructor(private modalCtrl:ModalController) { }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss(null, 'confirm');
  }

  ngOnInit() {}

}
