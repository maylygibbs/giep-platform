import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Evaluation360Component } from './evaluation360.component';

describe('Evaluation360Component', () => {
  let component: Evaluation360Component;
  let fixture: ComponentFixture<Evaluation360Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Evaluation360Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Evaluation360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
