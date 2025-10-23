import { IMatchPlayersList } from '@score-sheet-menu/models/match-players-list.model';
import { EGamesEnum } from '../enums/games.enum';
import { MatchStateActionsTypes } from '../enums/match-state-actions-types.enum';

export namespace MatchStateActions {
  export class InitializeMatchState {
    static readonly type = MatchStateActionsTypes.InitializeMatchState;
  }

  export class CreateAndStartMatch {
    static readonly type = MatchStateActionsTypes.CreateAndStartMatch;
    constructor(
      public gameType: EGamesEnum,
      public players: IMatchPlayersList[],
      public expansions: Array<{ name: string; icon?: string; }>     
    ) {}
  }

  export class EndMatch {
    static readonly type = MatchStateActionsTypes.SaveStage;
  }
}
