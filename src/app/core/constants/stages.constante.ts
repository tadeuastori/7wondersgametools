import { EStages } from "../enums/stages.enum";
import { IStage } from "../models/game/stage.model";

export const stagesList: IStage[] = [{
    stage: EStages.WONDER,
    order: 0,
    color: '#E7E8E9',
    icon: '',
    hasNegativeValue: false,
    hasPositiveValue: true
},
{
    stage: EStages.COIN,
    order: 1,
    color: '#FEFCD7',
    icon: '',
    hasNegativeValue: false,
    hasPositiveValue: true
},
{
    stage: EStages.MILITARY,
    order: 3,    
    color: '#F3CFC1',
    icon: '',
    hasNegativeValue: true,
    hasPositiveValue: true
},
{
    stage: EStages.CIVIC,
    order: 4,
    color: '#C8EBFB',
    icon: '',
    hasNegativeValue: false,
    hasPositiveValue: true
},
{
    stage: EStages.COMMERCE,
    order: 5,
    color: '#FEFCD7',
    icon: '',
    hasNegativeValue: false,
    hasPositiveValue: true
},
{
    stage: EStages.SCIENCE,
    order: 6,
    color: '#D9E9D2',
    icon: '',
    hasNegativeValue: false,
    hasPositiveValue: true
},
{
    stage: EStages.GUILD,
    order: 7,
    color: '#D1D4EA',
    icon: '',
    hasNegativeValue: false,
    hasPositiveValue: true
},
//Game base
{
    stage: EStages.CITIES,
    order: 8,
    color: '#A6A7AB',
    icon: '',
    hasNegativeValue: true,
    hasPositiveValue: true
},
{
    stage: EStages.DEBT,
    order: 2,
    color: '#FEFEFE',
    icon: '',
    hasNegativeValue: true,
    hasPositiveValue: true
},
{
    stage: EStages.LEADERS,
    order: 9,
    color: '#D1D2D4',
    icon: '',
    hasNegativeValue: true,
    hasPositiveValue: true
},
{
    stage: EStages.NAVAL,
    order: 10,
    color: '#9FCDED',
    icon: '',
    hasNegativeValue: true,
    hasPositiveValue: true
},
{
    stage: EStages.ISLAND,
    order: 11,
    color: '#CCE3F5',
    icon: '',
    hasNegativeValue: true,
    hasPositiveValue: true
},
//Architects
{
    stage: EStages.MEDALS,
    order: 12,
    color: '#F9E8C7',
    icon: '',
    hasNegativeValue: true,
    hasPositiveValue: true
},
//Duel
{
    stage: EStages.PANTHEON,
    order: 13 ,
    color: '#FEFEFE',
    icon: '',
    hasNegativeValue: true,
    hasPositiveValue: true
}];