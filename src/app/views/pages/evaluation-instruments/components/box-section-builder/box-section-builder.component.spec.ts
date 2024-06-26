import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxSectionBuilderComponent } from './box-section-builder.component';

describe('BoxSectionBuilderComponent', () => {
  let component: BoxSectionBuilderComponent;
  let fixture: ComponentFixture<BoxSectionBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxSectionBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxSectionBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
