import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspringComponent } from './newspring.component';

describe('NewspringComponent', () => {
  let component: NewspringComponent;
  let fixture: ComponentFixture<NewspringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewspringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewspringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
