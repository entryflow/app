import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-view-employee-info',
  templateUrl: './modal-view-employee-info.component.html',
  styleUrls: ['./modal-view-employee-info.component.scss'],
})
export class ModalViewEmployeeInfoComponent  implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss(null, 'confirm');
  }

  onModalViewEmployeeInfo(){

  }

  ngOnInit() {}

}
