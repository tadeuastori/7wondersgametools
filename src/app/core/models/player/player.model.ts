export interface IPlayer {
  id?: number;
  name: string;
}

export class Player implements IPlayer {
  id?: number;
  name: string;

  constructor(clone?: IPlayer) {
    this.name = '';

    if (clone) {
      this.id = clone.id;
      this.name = clone.name;
    }
  }
}
