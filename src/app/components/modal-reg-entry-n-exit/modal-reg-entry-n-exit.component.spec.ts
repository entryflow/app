import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalRegEntryNExitComponent } from './modal-reg-entry-n-exit.component';

describe('ModalRegEntryNExitComponent', () => {
  let component: ModalRegEntryNExitComponent;
  let fixture: ComponentFixture<ModalRegEntryNExitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRegEntryNExitComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRegEntryNExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
