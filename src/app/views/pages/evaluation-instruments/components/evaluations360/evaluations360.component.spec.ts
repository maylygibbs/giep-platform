import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Evaluations360Component } from './evaluations360.component';

describe('Evaluations360Component', () => {
  let component: Evaluations360Component;
  let fixture: ComponentFixture<Evaluations360Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Evaluations360Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Evaluations360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
