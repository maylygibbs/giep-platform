import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxMessageComponent } from './box-message.component';

describe('BoxMessageComponent', () => {
  let component: BoxMessageComponent;
  let fixture: ComponentFixture<BoxMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
