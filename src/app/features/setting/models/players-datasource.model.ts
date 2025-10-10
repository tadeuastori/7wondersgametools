import { DataSource } from '@angular/cdk/collections';
import { ReplaySubject, map, Observable } from 'rxjs';
import { IPlayer } from 'src/app/core/models/player/player.model';

export class PlayerDataSource extends DataSource<IPlayer> {
  private _dataStream = new ReplaySubject<IPlayer[]>();

  public count = this._dataStream.pipe(map((data) => data.length));

  constructor(initialData: IPlayer[] = []) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<IPlayer[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: IPlayer[]) {
    this._dataStream.next(data);
  }
}
