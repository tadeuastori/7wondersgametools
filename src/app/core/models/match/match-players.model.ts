import { EStages } from '../../enums/stages.enum';

export interface IMatchPlayer {
  name: string;
  wonder: string[];
  group: number;
  stages: Array<{ stage: EStages; score: number }>;

  totalStagesScore(): number;
  stageScore(stage: EStages): number;
}

export class MatchPlayer implements IMatchPlayer {
  name: string;
  wonder: string[];
  group: number;
  stages: Array<{ stage: EStages; score: number }>;

  public totalStagesScore(): number {
    return this.stages.length == 0
      ? 0
      : this.stages
          .map((item) => item.score)
          .reduce((total, item) => total + item, 0);
  }

  public stageScore(stage: EStages): number {
    return 0;
  }

  constructor(clone?: IMatchPlayer) {
    this.name = '';
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
