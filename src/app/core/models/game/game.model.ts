import { EGamesEnum } from '../../enums/games.enum';
import { Expansion, IExpansion } from './expansions.model';
import { IWonder, Wonder } from './wonder.model';

export interface IGame {
  name: string;
  description: string;
  version: number;
  expansions: IExpansion[];
  wonders: IWonder[];
  gameType: EGamesEnum;
  icon: string;
}

export class Game implements IGame {
  name: string;
  description: string;
  version: number;
  expansions: IExpansion[];
  wonders: IWonder[];
  gameType: EGamesEnum;
  icon: string;

  constructor(clone?: IGame) {
    this.name = '';
    this.description = '';
    this.version = 2;
    this.expansions = [new Expansion()] as IExpansion[];
    this.wonders = [new Wonder()] as IWonder[];
    this.gameType = EGamesEnum.GAME_BASE;
    this.icon = '';

    if (clone) {
      this.name = clone.name;
      this.description = clone.description;
      this.version = clone.version;
      this.expansions = clone.expansions;
      this.wonders = clone.wonders;
      this.gameType = clone.gameType;
      this.icon = clone.icon;
    }
  }
}
