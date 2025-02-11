export interface IPlayerRequest {
  name: string;
}

export class PlayerRequest implements IPlayerRequest {
  name: string;

  constructor(clone?: IPlayerRequest) {
    this.name = '';

    if (clone) {
      this.name = clone.name;
    }
  }
}
