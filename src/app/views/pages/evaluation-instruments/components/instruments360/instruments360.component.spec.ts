import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Instruments360Component } from './instruments360.component';

describe('Instruments360Component', () => {
  let component: Instruments360Component;
  let fixture: ComponentFixture<Instruments360Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Instruments360Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Instruments360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
