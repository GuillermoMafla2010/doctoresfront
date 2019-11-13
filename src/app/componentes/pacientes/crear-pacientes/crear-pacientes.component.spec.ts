import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPacientesComponent } from './crear-pacientes.component';

describe('CrearPacientesComponent', () => {
  let component: CrearPacientesComponent;
  let fixture: ComponentFixture<CrearPacientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPacientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
