import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaexpedComponent } from './staexped.component';

describe('StaexpedComponent', () => {
  let component: StaexpedComponent;
  let fixture: ComponentFixture<StaexpedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaexpedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaexpedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
