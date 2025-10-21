import { EStages } from "../../enums/stages.enum";

export interface IStage {
    stage: EStages;
    order: number;
    color: string;
    icon: string;
}

export class Stage implements IStage {
    stage: EStages
    order: number
    color: string
    icon: string

    constructor(clone?: IStage) {
        this.stage = EStages.WONDER;
        this.order = 0;
        this.color = '#000000';
        this.icon = '';
        if (clone) {
            this.stage = clone.stage;
            this.order = clone.order;
            this.color = clone.color;
            this.icon = clone.icon;
        }
    }
}