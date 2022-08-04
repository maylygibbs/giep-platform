import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxInstrumentsComponent } from './box-instruments.component';

describe('BoxInstrumentsComponent', () => {
  let component: BoxInstrumentsComponent;
  let fixture: ComponentFixture<BoxInstrumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxInstrumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxInstrumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
