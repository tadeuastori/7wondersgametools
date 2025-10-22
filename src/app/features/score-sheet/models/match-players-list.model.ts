import { EWonderSide } from '../../../core/enums/wonder-side.enum';

export interface IMatchPlayersList {
  id?: number;
  name: string;
  wonder?: Array<{ name: string; icon?: string; side?: EWonderSide }>;
  group?: number;
}

export class MatchPlayersList implements IMatchPlayersList {
  id?: number;
  name: string;
  wonder?: Array<{ name: string; icon?: string; side?: EWonderSide }>;
  group?: number;

  constructor(clone?: IMatchPlayersList) {
    id: undefined;
    this.name = '';
    this.wonder = undefined;
    this.group = undefined;

    if (clone) {
      this.id = clone.id;
      this.name = clone.name;
      this.wonder = clone.wonder;
      this.group = clone.group;
    }
  }
}
