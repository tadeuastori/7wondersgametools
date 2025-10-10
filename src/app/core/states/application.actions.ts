import { IMatchPlayers } from '../../features/score-sheet/models/match-players.model';
import { ApplicationStateActionsTypes } from '../enums/application-state-actions-types.enum';
import { EGamesEnum } from '../enums/games.enum';
import { IPlayerRequest } from '../models/player/player-request.model';
import { ISetting } from '../models/setting/setting.model';

export namespace ApplicationStateActions {
  export class InitializeApplicationState {
    static readonly type =
      ApplicationStateActionsTypes.InitializeApplicationState;
  }

  export class SaveApplicationSettings {
    static readonly type = ApplicationStateActionsTypes.SaveApplicationSettings;
    constructor(public payload: ISetting) {}
  }

  export class AddPlayerApplicationState {
    static readonly type =
      ApplicationStateActionsTypes.AddPlayerApplicationState;
    constructor(public payload: IPlayerRequest) {}
  }

  export class DeletePlayerApplicationState {
    static readonly type =
      ApplicationStateActionsTypes.DeletePlayerApplicationState;
    constructor(public id: number) {}
  }
}
