import { TestBed } from '@angular/core/testing';

import { MapHttpDataService } from './map-http-data.service';

describe('MapHttpDataService', () => {
  let service: MapHttpDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapHttpDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
