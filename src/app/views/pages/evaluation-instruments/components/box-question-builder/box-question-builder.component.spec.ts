import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxQuestionBuilderComponent } from './box-question-builder.component';

describe('BoxQuestionBuilderComponent', () => {
  let component: BoxQuestionBuilderComponent;
  let fixture: ComponentFixture<BoxQuestionBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxQuestionBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxQuestionBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
