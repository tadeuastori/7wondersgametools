import { Action, State, StateContext } from '@ngxs/store';
import { AppStoreKeys } from '../../store/store-keys.enum';
import {
  IApplicationStateModel,
  initialApplicationState,
} from '../models/state/application-state.model';
import { Injectable } from '@angular/core';
import { ApplicationStateActions } from './application.actions';
import { ApplicationDataService } from '../services/application-data.service';
import { PlayerService } from '../services/player.service';
import { catchError, combineLatest, combineLatestAll, first, map, of, switchMap, tap } from 'rxjs';
import { BaseState } from './base/base.state';
import { ISetting, Setting } from '../models/setting/setting.model';
import { ApplicationSettingsService } from '../services/application-settings.service';
import { SettingRequest } from '../models/setting/setting-request.model';
import { IPlayer } from '../models/player/player.model';

@State<IApplicationStateModel>({
  name: AppStoreKeys.ApplicationState,
  defaults: initialApplicationState,
})
@Injectable()
export class ApplicationState extends BaseState {
  constructor(
    private _applicationDataService: ApplicationDataService,
    private _PlayerService: PlayerService,
    private _SettingsService: ApplicationSettingsService
  ) {
    super();
  }

  private _startPathState(ctx: StateContext<IApplicationStateModel>) {
    ctx.patchState({
      isStateReady: false,
    });
  }

  private _endPathState(ctx: StateContext<IApplicationStateModel>) {
    ctx.patchState({
      isStateReady: true,
    });
  }

 @Action(ApplicationStateActions.InitializeApplicationState)
initializeApplicationState(ctx: StateContext<IApplicationStateModel>) {
  this._startPathState(ctx);

  return combineLatest([
    this._PlayerService.getPlayers(),
    this._SettingsService.getSettings().pipe(first())
  ]).pipe(
    switchMap(([players, settings]: [IPlayer[], ISetting[]]) => {
      if (settings.length === 0) {
        return this._SettingsService.addSettings(
          new SettingRequest({ userLanguage: 'en' })
        ).pipe(
          first(),
          map(newSetting => [players, newSetting] as [IPlayer[], ISetting])
        );
      }

      return of([players, settings[0]] as [IPlayer[], ISetting]);
    }),
    tap(([players, Setting]: [IPlayer[], ISetting]) => {
      ctx.patchState({
        isStateReady: true,
        settings: Setting,
        games: this._applicationDataService.getGameData(),
        players: players,
      });

      this._successSnakBar('Application State Initialized');
    })
  );
}



  @Action(ApplicationStateActions.SaveApplicationSettings)
  async saveApplicationSettings(
    ctx: StateContext<IApplicationStateModel>,
    { payload }: ApplicationStateActions.SaveApplicationSettings
  ) {
    this._startPathState(ctx);

    try {
      let settings = ctx.getState().settings;
      settings = {
        ...settings,
        ...payload,
      };

      ctx.setState({
        isStateReady: true,
        settings: settings,
        players: ctx.getState().players,
        games: ctx.getState().games,
      });

      this._successSnakBar('Application Settings Saved');
    } catch (error) {
      console.log('[saveApplicationSettings] - ' + error);
      this._errorSnakBar('[saveApplicationSettings]');
      this._endPathState(ctx);
    }
  }

  @Action(ApplicationStateActions.AddPlayerApplicationState)
  async addPlayerApplicationState(
    ctx: StateContext<IApplicationStateModel>,
    { payload }: ApplicationStateActions.AddPlayerApplicationState
  ) {
    this._startPathState(ctx);

    let currentPlayers = ctx.getState().players;

    const exists =
      currentPlayers.filter(
        (item) => item.name.toLowerCase() === payload.name.toLowerCase()
      ).length > 0;

    if (exists) {
      ctx.patchState({
        isStateReady: true,
      });
      this._infoSnakBar('Player already added to the database');
    } else {
      this._PlayerService
        .addPlayer(payload)
        .pipe(first())
        .subscribe({
          next: (player) => {
            ctx.patchState({
              isStateReady: true,
              players: [...currentPlayers, player],
            });
            this._successSnakBar('Player Added');
          },
          error: (err) => {
            console.log('[addPlayerApplicationState] - ' + err);
            this._endPathState(ctx);
          },
        });
    }
  }
}
