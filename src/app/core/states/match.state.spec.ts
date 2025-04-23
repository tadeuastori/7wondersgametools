import { TestBed } from '@angular/core/testing';
import { StateContext } from '@ngxs/store';
import { MatchState } from './match.state';
import { IMatchStateModel } from '../models/state/match-state.model';

describe('MatchState', () => {
  let matchState: MatchState;
  let ctx: StateContext<IMatchStateModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MatchState],
    });

    matchState = TestBed.inject(MatchState);
    // ctx = TestBed.inject(StateContext);
  });
});
