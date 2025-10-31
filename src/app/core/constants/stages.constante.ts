import { EStages } from "../enums/stages.enum";
import { IStage } from "../models/game/stage.model";

export const stagesList: IStage[] = [{
    stage: EStages.WONDER,
    order: 0,
    color: ['#E7E8E9','#000000'],
    icon: '',
    hasNegativeValue: false,
    hasPositiveValue: true,
    hasScoreCalculated: false
},
{
    stage: EStages.COIN,
    order: 1,
    color: ['#FEFCD7','#000000'],
    icon: '',
    hasNegativeValue: false,
    hasPositiveValue: true,
    hasScoreCalculated: true
},
{
    stage: EStages.MILITARY,
    order: 3,    
    color: ['#F3CFC1','#000000'],
    icon: '',
    hasNegativeValue: true,
    hasPositiveValue: true,
    hasScoreCalculated: false
},
{
    stage: EStages.CIVIC,
    order: 4,
    color: ['#C8EBFB','#000000'],
    icon: '',
    hasNegativeValue: false,
    hasPositiveValue: true,
    hasScoreCalculated: false
},
{
    stage: EStages.COMMERCE,
    order: 5,
    color: ['#FEFCD7','#000000'],
    icon: '',
    hasNegativeValue: false,
    hasPositiveValue: true,
    hasScoreCalculated: false
},
{
    stage: EStages.SCIENCE,
    order: 6,
    color: ['#D9E9D2','#000000'],
    icon: '',
    hasNegativeValue: false,
    hasPositiveValue: true,
    hasScoreCalculated: true
},
{
    stage: EStages.GUILD,
    order: 7,
    color: ['#D1D4EA','#000000'],
    icon: '',
    hasNegativeValue: false,
    hasPositiveValue: true,
    hasScoreCalculated: false
},
//Game base
{
    stage: EStages.CITIES,
    order: 8,
    color: ['#A6A7AB','#000000'],
    icon: '',
    hasNegativeValue: true,
    hasPositiveValue: true,
    hasScoreCalculated: false
},
{
    stage: EStages.DEBT,
    order: 2,
    color: ['#FEFEFE','#000000'],
    icon: '',
    hasNegativeValue: true,
    hasPositiveValue: false,
    hasScoreCalculated: false
},
{
    stage: EStages.LEADERS,
    order: 9,
    color: ['#D1D2D4','#000000'],
    icon: '',
    hasNegativeValue: true,
    hasPositiveValue: true,
    hasScoreCalculated: false
},
{
    stage: EStages.NAVAL,
    order: 10,
    color: ['#9FCDED','#000000'],
    icon: '',
    hasNegativeValue: true,
    hasPositiveValue: true,
    hasScoreCalculated: false
},
{
    stage: EStages.ISLAND,
    order: 11,
    color: ['#CCE3F5','#000000'],
    icon: '',
    hasNegativeValue: true,
    hasPositiveValue: true,
    hasScoreCalculated: false
},
//Architects
{
    stage: EStages.MEDALS,
    order: 12,
    color: ['#F9E8C7','#000000'],
    icon: '',
    hasNegativeValue: true,
    hasPositiveValue: true,
    hasScoreCalculated: false
},
//Duel
{
    stage: EStages.PANTHEON,
    order: 13 ,
    color: ['#FEFEFE','#000000'],
    icon: '',
    hasNegativeValue: true,
    hasPositiveValue: true,
    hasScoreCalculated: false
}];