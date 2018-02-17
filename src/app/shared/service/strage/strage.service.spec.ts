import { TestBed, inject } from '@angular/core/testing';

import { StrageService } from './strage.service';

describe('StrageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StrageService]
    });
  });

  it('should be created', inject([StrageService], (service: StrageService) => {
    expect(service).toBeTruthy();
  }));
});
