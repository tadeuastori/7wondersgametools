import { Injectable } from '@angular/core';
import { IPlayer } from '../models/player/player.model';
import { DatabaseService } from '../../shared/services/database.service';
import { Observable } from 'rxjs';
import { IPlayerRequest } from '../models/player/player-request.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private _dataBaseSchema = 'player';

  constructor(private _dataBase: DatabaseService) {}

  public getPlayers(): Observable<IPlayer[]> {
    return this._dataBase.getAll<IPlayer>(this._dataBaseSchema);
  }

  public addPlayer(player: IPlayerRequest): Observable<IPlayerRequest> {
    return this._dataBase.add<IPlayerRequest>(this._dataBaseSchema, player);
  }

  public updatePlayer(player: IPlayer): Observable<IPlayer> {
    return this._dataBase.update<IPlayer>(this._dataBaseSchema, player);
  }

  public deletePlayer(player: IPlayer): Observable<boolean> {
    return this._dataBase.deleteByKey(this._dataBaseSchema, player.id!);
  }
}
