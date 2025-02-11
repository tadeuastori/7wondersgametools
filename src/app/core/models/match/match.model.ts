import { IMatchPlayer } from './match-players.model';

export interface IMatch {
  matchDate: Date;
  game: string;
  expansions?: string[];
  players: IMatchPlayer[];
}

export class Match implements IMatch {
  matchDate: Date;
  game: string;
  expansions?: string[];
  players: IMatchPlayer[];

  constructor(clone?: IMatch) {
    this.matchDate = new Date();
    this.game = '';
    this.expansions = [];
    this.players = [];

    if (clone) {
      this.matchDate = clone.matchDate;
      this.game = clone.game;
      this.expansions = clone.expansions;
      this.players = clone.players;
    }
  }
}
