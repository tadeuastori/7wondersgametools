import { EWonderSide } from '../../enums/wonder-side.enum';
import { IPlayer, Player } from '../player/player.model';
import { IMatchPlayersStages } from './match-players-stages.model';

export interface IMatchPlayer {
  player: IPlayer;
  wonder: Array<{ name: string; side?: EWonderSide, icon?: string }>;
  group: number;
  stages: IMatchPlayersStages[];

  totalPlayerScores(): number;
}

export class MatchPlayer implements IMatchPlayer {
  player: IPlayer;
  wonder: Array<{ name: string; icon?: string; side?: EWonderSide }> = [];
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
    this.player = new Player();
    this.wonder = [];
    this.group = 0;
    this.stages = [];

    if (clone) {
      this.player = clone.player;
      this.wonder = clone.wonder;
      this.group = clone.group;
      this.stages = clone.stages;
    }
  }
}
