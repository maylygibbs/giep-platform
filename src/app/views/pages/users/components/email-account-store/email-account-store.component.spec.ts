import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAccountStoreComponent } from './email-account-store.component';

describe('EmailAccountStoreComponent', () => {
  let component: EmailAccountStoreComponent;
  let fixture: ComponentFixture<EmailAccountStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailAccountStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailAccountStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
