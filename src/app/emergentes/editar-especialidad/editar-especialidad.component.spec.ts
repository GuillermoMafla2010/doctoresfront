import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEspecialidadComponent } from './editar-especialidad.component';

describe('EditarEspecialidadComponent', () => {
  let component: EditarEspecialidadComponent;
  let fixture: ComponentFixture<EditarEspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEspecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
