import { TestBed } from '@angular/core/testing';

import { GetNewsService } from './get-news.service';

describe('GetNewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetNewsService = TestBed.get(GetNewsService);
    expect(service).toBeTruthy();
  });
});
