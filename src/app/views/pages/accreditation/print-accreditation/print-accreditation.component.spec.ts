import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintAccreditationComponent } from './print-accreditation.component';

describe('PrintAccreditationComponent', () => {
  let component: PrintAccreditationComponent;
  let fixture: ComponentFixture<PrintAccreditationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintAccreditationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintAccreditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
