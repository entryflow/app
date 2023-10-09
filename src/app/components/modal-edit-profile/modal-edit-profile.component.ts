import { Component, OnInit } from '@angular/core';
import	{	ModalController	}	from	'@ionic/angular';

@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.scss'],
})
export class ModalEditProfileComponent  implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss(null, 'confirm');
  }



}
