import { EGamesEnum } from '../../enums/games.enum';
import { IMatchPlayer } from './match-players.model';

export interface IMatch {
  matchDate: Date;
  gameType: EGamesEnum;
  expansions?: string[];
  players: IMatchPlayer[];
}

export class Match implements IMatch {
  matchDate: Date;
  gameType: EGamesEnum;
  expansions?: string[];
  players: IMatchPlayer[];

  constructor(clone?: IMatch) {
    this.matchDate = new Date();
    this.gameType = EGamesEnum.GAME_BASE;
    this.expansions = [];
    this.players = [];

    if (clone) {
      this.matchDate = clone.matchDate;
      this.gameType = clone.gameType;
      this.expansions = clone.expansions;
      this.players = clone.players;
    }
  }
}
