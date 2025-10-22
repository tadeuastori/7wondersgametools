import { stagesList } from '../../constants/stages.constante';
import { EStages } from '../../enums/stages.enum';
import { EWonderSide } from '../../enums/wonder-side.enum';
import { IExpansion } from '../game/expansions.model';
import { IPlayer, Player } from '../player/player.model';
import { IMatchPlayersStages, MatchPlayersStages } from './match-players-stages.model';

const baseStage: EStages[] = [EStages.WONDER, EStages.COIN, EStages.DEBT, EStages.MILITARY, EStages.CIVIC, EStages.COMMERCE, EStages.SCIENCE, EStages.GUILD];

export interface IMatchPlayer {
  player: IPlayer;
  wonder: Array<{ name: string; side?: EWonderSide, icon?: string }>;
  group: number;
  stages: IMatchPlayersStages[];

  totalPlayerScores(): number;

  generateStages(expansionList: IExpansion[]): void;
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

  generateStages(expansionList: IExpansion[]): void {

    for (let i = 0; i < stagesList.length; i++) {
      
      let newStage: IMatchPlayersStages = new MatchPlayersStages();
      newStage.stage = stagesList[i];

      if(baseStage.includes(stagesList[i].stage)) {
        newStage.activated = true;
      } else {
        expansionList.forEach((expansion) => {
          newStage.activated = expansion.stage.includes(stagesList[i].stage);
        });        
      }      

      this.stages.push(newStage);
    }

  };

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
