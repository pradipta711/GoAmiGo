import { TestBed, inject } from '@angular/core/testing';

import { UsertripService } from './usertrip.service';

describe('UsertripService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsertripService]
    });
  });

  it('should be created', inject([UsertripService], (service: UsertripService) => {
    expect(service).toBeTruthy();
  }));
});
