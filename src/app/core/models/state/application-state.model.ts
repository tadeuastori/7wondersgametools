import { Game, IGame } from '../game/game.model';
import { IPlayer, Player } from '../player/player.model';
import { ISetting, Setting } from '../setting/setting.model';

export interface IApplicationStateModel {
  isStateReady: boolean;
  settings: ISetting;
  players: IPlayer[];
  games: IGame[];
}

export const initialApplicationState: IApplicationStateModel = {
  isStateReady: false,
  settings: new Setting() as ISetting,
  players: [new Player()] as IPlayer[],
  games: [new Game()] as IGame[],
};
