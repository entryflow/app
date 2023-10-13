import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalViewEmployeeInfoComponent } from './modal-view-employee-info.component';

describe('ModalViewEmployeeInfoComponent', () => {
  let component: ModalViewEmployeeInfoComponent;
  let fixture: ComponentFixture<ModalViewEmployeeInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalViewEmployeeInfoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalViewEmployeeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
