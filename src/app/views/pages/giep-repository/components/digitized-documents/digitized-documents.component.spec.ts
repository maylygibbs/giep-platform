import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitizedDocumentsComponent } from './digitized-documents.component';

describe('DigitizedDocumentsComponent', () => {
  let component: DigitizedDocumentsComponent;
  let fixture: ComponentFixture<DigitizedDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitizedDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitizedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
