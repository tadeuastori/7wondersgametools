import { IWonder, Wonder } from './wonder.model';

export interface IExpansion {
  name: string;
  description?: string;
  wonders?: IWonder[];
  icon: string;
}

export class Expansion implements IExpansion {
  name: string;
  description?: string;
  wonders?: IWonder[];
  icon: string;

  constructor(clone?: IExpansion) {
    this.name = '';
    this.description = '';
    this.wonders = [new Wonder()] as IWonder[];
    this.icon = '';

    if (clone) {
      this.name = clone.name;
      this.description = clone.description;
      this.wonders = clone.wonders;
      this.icon = clone.icon;
    }
  }
}
