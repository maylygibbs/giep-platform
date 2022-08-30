import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentStoreComponent } from './instrument-store.component';

describe('InstrumentStoreComponent', () => {
  let component: InstrumentStoreComponent;
  let fixture: ComponentFixture<InstrumentStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
