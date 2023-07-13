import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationtypeStoreComponent } from './accreditationtype-store.component';

describe('AccreditationtypeStoreComponent', () => {
  let component: AccreditationtypeStoreComponent;
  let fixture: ComponentFixture<AccreditationtypeStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccreditationtypeStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditationtypeStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
