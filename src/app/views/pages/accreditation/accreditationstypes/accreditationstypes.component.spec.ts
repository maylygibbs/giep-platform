import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationstypesComponent } from './accreditationstypes.component';

describe('AccreditationstypesComponent', () => {
  let component: AccreditationstypesComponent;
  let fixture: ComponentFixture<AccreditationstypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccreditationstypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditationstypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
