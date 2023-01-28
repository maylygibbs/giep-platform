import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolStoreComponent } from './rol-store.component';

describe('RolStoreComponent', () => {
  let component: RolStoreComponent;
  let fixture: ComponentFixture<RolStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
