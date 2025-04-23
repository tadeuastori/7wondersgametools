import { IMatch } from '../match/match.model';

export interface IMatchStateModel {
  isStateReady: boolean;
  isMatchStarted: boolean;
  match: IMatch | null;
}

export const initialMatchState: IMatchStateModel = {
  isStateReady: false,
  isMatchStarted: false,
  match: null,
};
