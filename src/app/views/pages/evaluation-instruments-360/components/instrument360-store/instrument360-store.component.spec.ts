import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Instrument360StoreComponent } from './instrument360-store.component';

describe('Instrument360StoreComponent', () => {
  let component: Instrument360StoreComponent;
  let fixture: ComponentFixture<Instrument360StoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Instrument360StoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Instrument360StoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
