import { EGamesEnum } from '../../enums/games.enum';
import { IMatchPlayer } from './match-players.model';

export interface IMatch {
  id?: number;
  matchDate: Date;
  gameType: EGamesEnum;
  expansions: Array<{ name: string; icon?: string; }>;
  players: IMatchPlayer[];
  isCompleted: boolean;
}

export class Match implements IMatch {
  id?: number;
  matchDate: Date;
  gameType: EGamesEnum;
  expansions: Array<{ name: string; icon?: string; }>;
  players: IMatchPlayer[];
  isCompleted: boolean;

  constructor(clone?: IMatch) {
    this.matchDate = new Date();
    this.gameType = EGamesEnum.GAME_BASE;
    this.expansions = [];
    this.players = [];
    this.isCompleted = false;

    if (clone) {
      this.id = clone.id;
      this.matchDate = clone.matchDate;
      this.gameType = clone.gameType;
      this.expansions = clone.expansions;
      this.players = clone.players;
      this.isCompleted = clone.isCompleted;
    }
  }
}
