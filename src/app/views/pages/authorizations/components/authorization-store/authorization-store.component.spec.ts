import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationStoreComponent } from './authorization-store.component';

describe('AuthorizationStoreComponent', () => {
  let component: AuthorizationStoreComponent;
  let fixture: ComponentFixture<AuthorizationStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
