import { IMatchPlayers } from '../../features/score-sheet/models/match-players.model';
import { EGamesEnum } from '../enums/games.enum';
import { MatchStateActionsTypes } from '../enums/match-state-actions-types.enum';

export namespace MatchStateActions {
  export class InitializeMatchState {
    static readonly type = MatchStateActionsTypes.InitializeMatchState;
  }

  export class CreateAndStartMatch {
    static readonly type = MatchStateActionsTypes.CreateAndStartMatch;
    constructor(
      public game: EGamesEnum,
      public expansions: string[],
      public players: IMatchPlayers[]
    ) {}
  }

  export class EndMatch {
    static readonly type = MatchStateActionsTypes.SaveStage;
  }
}
