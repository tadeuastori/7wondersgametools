import { EGamesEnum } from '../../enums/games.enum';
import { IMatchPlayersStages } from './match-players-stages.model';
import { IMatchPlayer } from './match-players.model';

export interface IMatchRequest {
  matchDate: Date;
  gameType: EGamesEnum;
  expansions: Array<{ name: string; icon?: string; }>;
  players: IMatchPlayer[];
}

export class MatchRequest implements IMatchRequest {
  matchDate: Date;
  gameType: EGamesEnum;
  expansions: Array<{ name: string; icon?: string; }>;
  players: IMatchPlayer[];

  constructor(clone?: IMatchRequest) {
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
