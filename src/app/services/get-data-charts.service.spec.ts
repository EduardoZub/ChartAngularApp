import { TestBed } from '@angular/core/testing';

import { GetDataChartsService } from './get-data-charts.service';

describe('GetDataChartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetDataChartsService = TestBed.get(GetDataChartsService);
    expect(service).toBeTruthy();
  });
});
