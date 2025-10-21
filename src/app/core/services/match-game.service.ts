import { Injectable } from '@angular/core';
import { IMatch } from '../models/match/match.model';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { IMatchRequest } from '../models/match/match-request.model';

@Injectable({
  providedIn: 'root'
})
export class MatchGameService {
  private _dataBaseSchema = 'matchGame'

  constructor(private _dataBase: DatabaseService) {}

  public getMatchById(key: number): Observable<IMatch> {
    return this._dataBase.getByKey<IMatch>(this._dataBaseSchema, key);
  }

  public getMatches(): Observable<IMatch[]> {
    return this._dataBase.getAll<IMatch>(this._dataBaseSchema);
  }

  public addMatch(match: IMatchRequest): Observable<IMatchRequest> {
    return this._dataBase.add<IMatchRequest>(this._dataBaseSchema, match);
  }

  public updateMatch(match: IMatch): Observable<IMatch> {
    return this._dataBase.update<IMatch>(this._dataBaseSchema, match);
  }

  public deleteMatch(id: number): Observable<IMatch[]> {
    return this._dataBase.deleteByKey(this._dataBaseSchema, id);
  }
}
