import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxUtilViewsComponent } from './box-util-views.component';

describe('BoxUtilViewsComponent', () => {
  let component: BoxUtilViewsComponent;
  let fixture: ComponentFixture<BoxUtilViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxUtilViewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxUtilViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
