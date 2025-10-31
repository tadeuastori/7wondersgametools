import { stagesList } from "src/app/core/constants/stages.constante";
import { EStages } from "src/app/core/enums/stages.enum";
import { MatchPlayersStages } from "src/app/core/models/match/match-players-stages.model";
import { Player } from "src/app/core/models/player/player.model";
import { IStagePlayerList } from "src/app/core/models/stage/stage-player-list.model";

const stagesListIndex: number = 6;
// const stagesListIndex: number = 5; //science

export const mockStagePlayerList: IStagePlayerList[] = [
    {
        player: new Player({name: 'Carlos', id: 1}), 
        stages: new MatchPlayersStages({
            stage: stagesList[stagesListIndex],
            score: 0,
            totalSetOf3: 0,
            totalCompass: 0,
            totalGear: 0,
            totalTable: 0,
            totalCoin: 0,
            activated: true,
            setStageScores: (value: number | number[], stage: EStages) => { },
            getStageScores: (stage: EStages) => { return 0; },
        })        
    },
    {
        player: new Player({name: 'Viviane', id: 2}), 
        stages: new MatchPlayersStages({
            stage: stagesList[stagesListIndex],
            score: 0,
            totalSetOf3: 0,
            totalCompass: 0,
            totalGear: 0,
            totalTable: 0,
            totalCoin: 0,
            activated: true,
            setStageScores: (value: number | number[], stage: EStages) => { },
            getStageScores: (stage: EStages) => { return 0; },
        })
    },
    {
        player: new Player({name: 'Erick', id: 3}), 
        stages: new MatchPlayersStages({
            stage: stagesList[stagesListIndex],
            score: 0,
            totalSetOf3: 0,
            totalCompass: 0,
            totalGear: 0,
            totalTable: 0,
            totalCoin: 0,
            activated: true,
            setStageScores: (value: number | number[], stage: EStages) => { },
            getStageScores: (stage: EStages) => { return 0; },
        })
    },
    {
        player: new Player({name: 'Fernanda', id: 4}), 
        stages: new MatchPlayersStages({
            stage: stagesList[stagesListIndex],
            score: 0,
            totalSetOf3: 0,
            totalCompass: 0,
            totalGear: 0,
            totalTable: 0,
            totalCoin: 0,
            activated: true,
            setStageScores: (value: number | number[], stage: EStages) => { },
            getStageScores: (stage: EStages) => { return 0; },
        })
    },
]