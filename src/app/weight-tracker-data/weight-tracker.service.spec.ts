import { TestBed, inject } from '@angular/core/testing';

import { WeightTrackerService } from './weight-tracker.service';

describe('WeightTrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeightTrackerService]
    });
  });

  it('should be created', inject([WeightTrackerService], (service: WeightTrackerService) => {
    expect(service).toBeTruthy();
  }));
});
