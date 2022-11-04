import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByCounterComponent } from './by-counter.component';

describe('ByCounterComponent', () => {
  let component: ByCounterComponent;
  let fixture: ComponentFixture<ByCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
