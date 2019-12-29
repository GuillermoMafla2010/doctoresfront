import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDoctoresComponent } from './editar-doctores.component';

describe('EditarDoctoresComponent', () => {
  let component: EditarDoctoresComponent;
  let fixture: ComponentFixture<EditarDoctoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarDoctoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
