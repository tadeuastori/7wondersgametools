import { TestBed } from '@angular/core/testing';

import { MatchGameService } from './match-game.service';

describe('MatchGameService', () => {
  let service: MatchGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
