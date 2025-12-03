import { TestBed } from '@angular/core/testing';

import { GymApi } from './gym-api';

describe('GymApi', () => {
  let service: GymApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GymApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
