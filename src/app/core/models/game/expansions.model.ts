import { EStages } from '../../enums/stages.enum';
import { IWonder, Wonder } from './wonder.model';

export interface IExpansion {
  name: string;
  label: string;
  description?: string;
  wonders?: IWonder[];
  icon: string;
  stage: EStages[];
}

export class Expansion implements IExpansion {
  name: string;
  label: string;
  description?: string;
  wonders?: IWonder[];
  icon: string;
  stage: EStages[];

  constructor(clone?: IExpansion) {
    this.name = '';
    this.label = '';
    this.description = '';
    this.wonders = [new Wonder()] as IWonder[];
    this.icon = '';
    this.stage = [];

    if (clone) {
      this.name = clone.name;
      this.label = clone.label;
      this.description = clone.description;
      this.wonders = clone.wonders;
      this.icon = clone.icon;
      this.stage = clone.stage;
    }
  }
}
