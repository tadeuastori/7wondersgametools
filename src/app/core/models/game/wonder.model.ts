import { EWonderSide } from '../../enums/wonder-side.enum';

export interface IWonder {
  name: string;
  description: string;
  side: EWonderSide;
}

export class Wonder implements IWonder {
  name: string;
  description: string;
  side: EWonderSide;

  constructor(clone?: IWonder) {
    this.name = '';
    this.description = '';
    this.side = EWonderSide.DAY;

    if (clone) {
      this.name = clone.name;
      this.description = clone.description;
      this.side = clone.side;
    }
  }
}
