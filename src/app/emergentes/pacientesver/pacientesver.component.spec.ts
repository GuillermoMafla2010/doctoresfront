import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesverComponent } from './pacientesver.component';

describe('PacientesverComponent', () => {
  let component: PacientesverComponent;
  let fixture: ComponentFixture<PacientesverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientesverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
