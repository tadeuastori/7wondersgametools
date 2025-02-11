import { Game, IGame } from '../game/game.model';
import { IPlayer, Player } from '../player/player.model';
import {
  ApplicationSetting,
  IApplicationSettings,
} from './application-state-settings.model';

export interface IApplicationStateModel {
  isStateReady: boolean;
  settings: IApplicationSettings;
  players: IPlayer[];
  games: IGame[];
}

export const initialApplicationState: IApplicationStateModel = {
  isStateReady: false,
  settings: new ApplicationSetting() as IApplicationSettings,
  players: [new Player()] as IPlayer[],
  games: [new Game()] as IGame[],
};
