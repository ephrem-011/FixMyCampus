import { TestBed } from '@angular/core/testing';
import { BuildingApi } from './building-api';

describe('BuildingApi', () => {
  let service: BuildingApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildingApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
