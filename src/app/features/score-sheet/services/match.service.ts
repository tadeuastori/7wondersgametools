import { Injectable } from '@angular/core';
import { DatabaseService } from '../../../shared/services/database.service';
import { Observable } from 'rxjs';
import { IMatchRequest } from '../models/match-request.model';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private _dataBaseSchema = 'match';

  constructor(private _dataBase: DatabaseService) {}

  public startMatch(newMatchRequest: IMatchRequest): Observable<IMatchRequest> {
    return this._dataBase.add<IMatchRequest>(
      this._dataBaseSchema,
      newMatchRequest
    );
  }
}
