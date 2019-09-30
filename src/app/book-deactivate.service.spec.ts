import { TestBed } from '@angular/core/testing';

import { BookDeactivateService } from './book-deactivate.service';

describe('BookDeactivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookDeactivateService = TestBed.get(BookDeactivateService);
    expect(service).toBeTruthy();
  });
});
