import { IStage, Stage } from "../game/stage.model";

export interface IMatchPlayersStages {
    stage: IStage;
    score: number;
    scoreCompass: number;
    scoreGear: number;
    scoreTable: number;

    setScientificStagesScore(compass: number, gear: number, table: number): void;
}

export class MatchPlayersStages implements IMatchPlayersStages {
    stage: IStage;
    score: number;
    scoreCompass: number;
    scoreGear: number;
    scoreTable: number;

    setScientificStagesScore(compass: number, gear: number, table: number): void {        
        this.scoreCompass = compass;
        this.scoreGear = gear;
        this.scoreTable = table;
        
        this.score = this.scoreCompass + this.scoreGear + this.scoreTable;
    }

    constructor(clone?: IMatchPlayersStages) {
        this.stage = new Stage();
        this.score = 0;
        this.scoreCompass = 0;
        this.scoreGear = 0;
        this.scoreTable = 0;

        if (clone) {
            this.stage = clone.stage;
            this.score = clone.score;
            this.scoreCompass = clone.scoreCompass;
            this.scoreGear = clone.scoreGear;
            this.scoreTable = clone.scoreTable;
        }
    }
}