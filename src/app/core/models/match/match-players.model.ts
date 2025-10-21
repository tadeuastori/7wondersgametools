import { IPlayer, Player } from '../player/player.model';
import { IMatchPlayersStages } from './match-players-stages.model';

export interface IMatchPlayer {
  name: IPlayer;
  wonder: string[];
  group: number;
  stages: IMatchPlayersStages[];

  totalPlayerScores(): number;
}

export class MatchPlayer implements IMatchPlayer {
  name: IPlayer;
  wonder: string[];
  group: number;
  stages: IMatchPlayersStages[];

  public totalPlayerScores(): number {
    return this.stages.length == 0
      ? 0
      : this.stages
          .map((item) => item.score)
          .reduce((total, item) => total + item, 0);
  }

  constructor(clone?: IMatchPlayer) {
    this.name = new Player();
    this.wonder = [];
    this.group = 0;
    this.stages = [];

    if (clone) {
      this.name = clone.name;
      this.wonder = clone.wonder;
      this.group = clone.group;
      this.stages = clone.stages;
    }
  }
}
