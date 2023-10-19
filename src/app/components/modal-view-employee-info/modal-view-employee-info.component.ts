import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-view-employee-info',
  templateUrl: './modal-view-employee-info.component.html',
  styleUrls: ['./modal-view-employee-info.component.scss'],
})
export class ModalViewEmployeeInfoComponent  implements OnInit {

  public employeeName?: string;
  public employeeFirstName?: string;
  public employeeLastName?: string;
  public employeePhone?: string;
  public employeeEmail?: string;
  public employeeControlNumber?: string;
  public employeeGender?: string;
  public employeeBirthDate?: string;
  public employeeAvatar?: string;

  constructor(private modalCtrl:ModalController,)
  {

   }

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
