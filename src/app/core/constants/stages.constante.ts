import { EStages } from "../enums/stages.enum";
import { IStage } from "../models/game/stage.model";

export const stagesList: IStage[] = [{
    stage: EStages.WONDER,
    order: 0,
    color: '#E7E8E9',
    icon: ''
},
{
    stage: EStages.COIN,
    order: 1,
    color: '#FEFCD7',
    icon: ''
},
{
    stage: EStages.MILITARY,
    order: 3,    
    color: '#F3CFC1',
    icon: ''
},
{
    stage: EStages.CIVIC,
    order: 4,
    color: '#C8EBFB',
    icon: ''
},
{
    stage: EStages.COMMERCE,
    order: 5,
    color: '#FEFCD7',
    icon: ''
},
{
    stage: EStages.SCIENCE,
    order: 6,
    color: '#D9E9D2',
    icon: ''
},
{
    stage: EStages.GUILD,
    order: 7,
    color: '#D1D4EA',
    icon: ''
},
//Game base
{
    stage: EStages.CITIES,
    order: 8,
    color: '#A6A7AB',
    icon: ''
},
{
    stage: EStages.DEBT,
    order: 2,
    color: '#FEFEFE',
    icon: ''
},
{
    stage: EStages.LEADERS,
    order: 9,
    color: '#D1D2D4',
    icon: ''
},
{
    stage: EStages.NAVAL,
    order: 10,
    color: '#9FCDED',
    icon: ''
},
{
    stage: EStages.ISLAND,
    order: 11,
    color: '#CCE3F5',
    icon: ''
},
//Architects
{
    stage: EStages.MEDALS,
    order: 12,
    color: '#F9E8C7',
    icon: ''
},
//Duel
{
    stage: EStages.PANTHEON,
    order: 13 ,
    color: '#FEFEFE',
    icon: ''
}];