import { TestBed } from '@angular/core/testing';

import { CreateChartService } from './create-chart.service';

describe('CreateChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateChartService = TestBed.get(CreateChartService);
    expect(service).toBeTruthy();
  });
});
