import { DataSource } from '@angular/cdk/collections';
import { ReplaySubject, map, Observable } from 'rxjs';
import { IMatchPlayersList } from './match-players-list.model';

export class MatchPlayerDataSource extends DataSource<IMatchPlayersList> {
  private _dataStream = new ReplaySubject<IMatchPlayersList[]>();

  public count = this._dataStream.pipe(map((data) => data.length));

  constructor(initialData: IMatchPlayersList[] = []) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<IMatchPlayersList[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: IMatchPlayersList[]) {
    this._dataStream.next(data);
  }
}
