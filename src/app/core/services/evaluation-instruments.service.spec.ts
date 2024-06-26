import { TestBed } from '@angular/core/testing';

import { EvaluationInstrumentsService } from './evaluation-instruments.service';

describe('EvaluationInstrumentsService', () => {
  let service: EvaluationInstrumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationInstrumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
