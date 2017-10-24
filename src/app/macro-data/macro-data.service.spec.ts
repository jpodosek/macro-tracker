import { TestBed, inject } from '@angular/core/testing';

import { MacroDataService } from './macro-data.service';

describe('MacroDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MacroDataService]
    });
  });

  it('should be created', inject([MacroDataService], (service: MacroDataService) => {
    expect(service).toBeTruthy();
  }));
});
