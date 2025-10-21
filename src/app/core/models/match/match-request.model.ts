import { EGamesEnum } from '../../enums/games.enum';
import { IMatchPlayer } from './match-players.model';

export interface IMatchRequest {
  id?: number;
  matchDate: Date;
  gameType: EGamesEnum;
  expansions?: string[];
  players: IMatchPlayer[];
}

export class Match implements IMatchRequest {
  id?: number;
  matchDate: Date;
  gameType: EGamesEnum;
  expansions?: string[];
  players: IMatchPlayer[];

  constructor(clone?: IMatchRequest) {
    this.matchDate = new Date();
    this.gameType = EGamesEnum.GAME_BASE;
    this.expansions = [];
    this.players = [];

    if (clone) {
      this.id = clone.id;
      this.matchDate = clone.matchDate;
      this.gameType = clone.gameType;
      this.expansions = clone.expansions;
      this.players = clone.players;
    }
  }
}
