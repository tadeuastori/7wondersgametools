import { Injectable } from '@angular/core';
import { ISetting } from '../models/setting/setting.model';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { ISettingsRequest } from '../models/setting/setting-request.model';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private _dataBaseSchema = 'settings';

  constructor(private _dataBase: DatabaseService) {}

  public getSettings(): Observable<ISetting[]> {
    return this._dataBase.getAll<ISetting>(this._dataBaseSchema);
  }

  public addSetting(settings: ISettingsRequest): Observable<ISetting> {
    return this._dataBase.add<ISetting>(this._dataBaseSchema, settings);
  }

  public updateSetting(settings: ISetting): Observable<ISetting> {
    return this._dataBase.update<ISetting>(this._dataBaseSchema, settings);
  }

  public deleteSetting(settingsId: number): Observable<ISetting[]> {
    return this._dataBase.deleteByKey(this._dataBaseSchema, settingsId);
  }
}
