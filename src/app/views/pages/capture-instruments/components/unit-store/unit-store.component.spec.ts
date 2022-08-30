import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitStoreComponent } from './unit-store.component';

describe('UnitStoreComponent', () => {
  let component: UnitStoreComponent;
  let fixture: ComponentFixture<UnitStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
