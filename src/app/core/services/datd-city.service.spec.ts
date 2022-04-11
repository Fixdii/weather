import { TestBed } from '@angular/core/testing';

import { DataCityService } from './data-city.service';

describe('SearchCityService', () => {
  let service: DataCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
