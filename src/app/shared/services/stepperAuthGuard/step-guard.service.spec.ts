import { TestBed } from '@angular/core/testing';

import { StepGuardService } from './step-guard.service';

describe('StepGuardService', () => {
  let service: StepGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
