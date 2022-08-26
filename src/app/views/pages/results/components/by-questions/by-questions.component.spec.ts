import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByQuestionsComponent } from './by-questions.component';

describe('ByQuestionsComponent', () => {
  let component: ByQuestionsComponent;
  let fixture: ComponentFixture<ByQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
