import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroESPage } from './registro-es.page';

describe('RegistroESPage', () => {
  let component: RegistroESPage;
  let fixture: ComponentFixture<RegistroESPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroESPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
