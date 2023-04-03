import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAccountsComponent } from './email-accounts.component';

describe('EmailAccountsComponent', () => {
  let component: EmailAccountsComponent;
  let fixture: ComponentFixture<EmailAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
