import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanqrComponent } from './scanqr.component';

describe('ScanqrComponent', () => {
  let component: ScanqrComponent;
  let fixture: ComponentFixture<ScanqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanqrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
