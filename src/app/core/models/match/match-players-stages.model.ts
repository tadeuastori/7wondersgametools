import { EStages } from "../../enums/stages.enum";
import { IStage, Stage } from "../game/stage.model";

export interface IMatchPlayersStages {
    stage: IStage;
    score: number;
    totalSetOf3: number;
    totalCompass: number;
    totalGear: number;
    totalTable: number;
    totalCoin: number;
    activated: boolean;

    setStageScores(value: number | number[], stage: EStages): void;
    getStageScores(stage: EStages): number | number[];
}

export class MatchPlayersStages implements IMatchPlayersStages {
    stage: IStage;
    score: number;
    totalSetOf3: number;
    totalCompass: number;
    totalGear: number;
    totalTable: number;
    totalCoin: number;
    activated: boolean;

    public setStageScores(value: number | number[], stage: EStages): void {       
        if(Array.isArray(value)) {      
            switch (stage) {
            case EStages.SCIENCE:
                this.setScientificStagesScore(value[0], value[1], value[2], value[3]);
                break;
            default:
                this.score = value[0];
                break;
            }
        } else {
                switch (stage) {
                case EStages.COIN:
                    this.setCoinStageScore(value);
                    break;
                default:
                    this.score = value;
                    break;
                }   
            }
    }

    public getStageScores(stage: EStages): number | number[] {
        switch (stage) {
            case EStages.SCIENCE:
                return [this.totalCompass, this.totalGear, this.totalTable, this.totalSetOf3];
            case EStages.COIN:
                return this.totalCoin;
            default:
                return this.score;
        }
    }


    private setScientificStagesScore(compass: number, gear: number, table: number, setOf3: number): void {        
        let total: number = 0;
        
        this.totalCompass = compass;
        this.totalGear = gear;
        this.totalTable = table;

        total += compass * compass;
        total += gear * gear;
        total += table * table;

        if (setOf3 > 0) {
            this.totalSetOf3 = setOf3;
            total += setOf3 * 7;
        }
        
        this.score = total;
    }

    private setCoinStageScore(coin: number): void {
        this.totalCoin = coin;
        this.score = this.totalCoin < 0 ? 0 : Math.floor(this.totalCoin / 3);
    }

    constructor(clone?: IMatchPlayersStages) {
        this.stage = new Stage();        
        this.score = 0;
        this.totalSetOf3 = 0;
        this.totalCompass = 0;
        this.totalGear = 0;
        this.totalTable = 0;
        this.totalCoin = 0;
        this.activated = false;

        if (clone) {
            this.stage = clone.stage;
            this.score = clone.score;
            this.totalSetOf3 = clone.totalSetOf3;
            this.totalCompass = clone.totalCompass;
            this.totalGear = clone.totalGear;
            this.totalTable = clone.totalTable;
            this.totalCoin = clone.totalCoin;
            this.activated = clone.activated;
        }
    }
}