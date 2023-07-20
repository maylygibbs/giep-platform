import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicReportsComponent } from './graphic-reports.component';

describe('GraphicReportsComponent', () => {
  let component: GraphicReportsComponent;
  let fixture: ComponentFixture<GraphicReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
