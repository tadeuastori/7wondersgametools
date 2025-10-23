import { IMatch } from '../match/match.model';

export interface IMatchStateModel {
  isStateReady: boolean;
  match: IMatch | null;
}

export const initialMatchState: IMatchStateModel = {
  isStateReady: false,
  match: null,
};
