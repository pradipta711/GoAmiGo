import { TestBed, inject } from '@angular/core/testing';

import { GetimagesService } from './getimages.service';

describe('GetimagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetimagesService]
    });
  });

  it('should be created', inject([GetimagesService], (service: GetimagesService) => {
    expect(service).toBeTruthy();
  }));
});
