import { createPropertySelectors, createSelector } from '@ngxs/store';
import { IMatchStateModel } from '../models/state/match-state.model';
import { MatchState } from './match.state';

export class MatchStateSelectors {
  static getSlices = createPropertySelectors<IMatchStateModel>(MatchState);

  static getMatchState = createSelector([MatchState], (state) => state);

  static isStateReady = createSelector(
    [this.getSlices.isStateReady],
    (isStateReady) => isStateReady
  );

  static isMatchStarted = createSelector(
    [this.getSlices.isMatchStarted],
    (isMatchStarted) => isMatchStarted
  );

  static getMatch = createSelector([this.getSlices.match], (match) => match);
}
