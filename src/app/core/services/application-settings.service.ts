import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { ISetting } from '../models/setting/setting.model';
import { Observable } from 'rxjs';
import { ISettingsRequest } from '../models/setting/setting-request.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationSettingsService {
  private _dataBaseSchema = 'settings'

  constructor(private _dataBase: DatabaseService) { }

  public getSettings(): Observable<ISetting[]> {
      return this._dataBase.getAll<ISetting>(this._dataBaseSchema);
    }
  
    public addSettings(player: ISettingsRequest): Observable<ISettingsRequest> {
      return this._dataBase.add<ISettingsRequest>(this._dataBaseSchema, player);
    }
  
    public updateSettings(player: ISetting): Observable<ISetting> {
      return this._dataBase.update<ISetting>(this._dataBaseSchema, player);
    }
  
    public deleteSettings(player: ISetting): void {
      this._dataBase.deleteByKey(this._dataBaseSchema, player.id!);
    }
}
