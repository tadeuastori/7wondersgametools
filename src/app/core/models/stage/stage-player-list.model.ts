import { IMatchPlayersStages, MatchPlayersStages } from "../match/match-players-stages.model";
import { IPlayer, Player } from "../player/player.model";

export interface IStagePlayerList {
    player: IPlayer;
    stages: IMatchPlayersStages;
}

export class StagePlayerList implements IStagePlayerList {
    player: IPlayer;
    stages: IMatchPlayersStages;

    constructor(clone?: IStagePlayerList) {
        this.player = new Player();
        this.stages = new MatchPlayersStages();

        if (clone) {
            this.player = clone.player;
            this.stages = clone.stages;
        }
    }
}