import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersToEvaluateComponent } from './users-to-evaluate.component';

describe('UsersToEvaluateComponent', () => {
  let component: UsersToEvaluateComponent;
  let fixture: ComponentFixture<UsersToEvaluateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersToEvaluateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersToEvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
