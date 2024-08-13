import { IWonder, Wonder } from './wonder.model';

export interface IExpansion {
  name: string;
  description: string;
  wonders: IWonder[];
}

export class Expansion implements IExpansion {
  name: string;
  description: string;
  wonders: IWonder[];

  constructor(clone?: IExpansion) {
    this.name = '';
    this.description = '';
    this.wonders = [new Wonder()] as IWonder[];

    if (clone) {
      this.name = clone.name;
      this.description = clone.description;
      this.wonders = clone.wonders;
    }
  }
}
