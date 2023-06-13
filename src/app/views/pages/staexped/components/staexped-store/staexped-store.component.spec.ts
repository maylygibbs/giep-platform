import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaexpedStoreComponent } from './staexped-store.component';

describe('StaexpedStoreComponent', () => {
  let component: StaexpedStoreComponent;
  let fixture: ComponentFixture<StaexpedStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaexpedStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaexpedStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
