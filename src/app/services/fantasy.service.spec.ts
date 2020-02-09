import { TestBed } from '@angular/core/testing';

import { FantasyService } from './fantasy.service';

describe('FantasyService', () => {
  let service: FantasyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FantasyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
