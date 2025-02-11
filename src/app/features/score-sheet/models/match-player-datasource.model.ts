import { DataSource } from '@angular/cdk/collections';
import { ReplaySubject, map, Observable } from 'rxjs';
import { IMatchPlayers } from './match-players.model';

export class MatchPlayerDataSource extends DataSource<IMatchPlayers> {
  private _dataStream = new ReplaySubject<IMatchPlayers[]>();

  public count = this._dataStream.pipe(map((data) => data.length));

  constructor(initialData: IMatchPlayers[] = []) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<IMatchPlayers[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: IMatchPlayers[]) {
    this._dataStream.next(data);
  }
}
