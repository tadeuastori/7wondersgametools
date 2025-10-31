import { DataSource } from '@angular/cdk/collections';
import { ReplaySubject, map, Observable } from 'rxjs';
import { IStagePlayerList } from './stage-player-list.model';

export class StagePlayerDataSource extends DataSource<IStagePlayerList> {
  private _dataStream = new ReplaySubject<IStagePlayerList[]>();

  public count = this._dataStream.pipe(map((data) => data.length));

  constructor(initialData: IStagePlayerList[] = []) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<IStagePlayerList[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: IStagePlayerList[]) {
    this._dataStream.next(data);
  }
}
