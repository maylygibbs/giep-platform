import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationDetailComponent } from './accreditation-detail.component';

describe('AccreditationDetailComponent', () => {
  let component: AccreditationDetailComponent;
  let fixture: ComponentFixture<AccreditationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccreditationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
