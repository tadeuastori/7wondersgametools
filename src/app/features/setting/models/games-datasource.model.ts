import { DataSource } from '@angular/cdk/collections';
import { ReplaySubject, map, Observable } from 'rxjs';
import { IGameDataSource } from './game-datasource.model';

export class GamesDataSource extends DataSource<IGameDataSource> {
  private _dataStream = new ReplaySubject<IGameDataSource[]>();

  public count = this._dataStream.pipe(map((data) => data.length));

  constructor(initialData: IGameDataSource[] = []) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<IGameDataSource[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: IGameDataSource[]) {
    this._dataStream.next(data);
  }
}