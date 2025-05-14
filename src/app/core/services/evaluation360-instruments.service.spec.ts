import { TestBed } from '@angular/core/testing';

import { Evaluation360InstrumentsService } from './evaluation360-instruments.service';

describe('Evaluation360InstrumentsService', () => {
  let service: Evaluation360InstrumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Evaluation360InstrumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
