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
import { error } from 'console';

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

    var currentGames = this._applicationDataService.getGameData();

    return combineLatest([
      this._PlayerService.getPlayers(),
      this._SettingsService.getSettings().pipe(first())
    ]).pipe(
      switchMap(([players, settings]: [IPlayer[], ISetting[]]) => {
        if (settings.length === 0) {
          return this._SettingsService.addSettings(
            new SettingRequest({ userLanguage: 'OS' })
          ).pipe(
            first(),
            map(newSetting => [players, newSetting] as [IPlayer[], ISetting])
          );
        }

        return of([players, settings[0]] as [IPlayer[], ISetting]);
      }),
      tap({
        next: ([players, Setting]: [IPlayer[], ISetting]) => {
          ctx.patchState({
            isStateReady: true,
            settings: Setting,
            games: currentGames,
            players: players,
          })},
          error: (error) => {
            console.log('[initializeApplicationState] - ' + error);
            this._errorSnakBar('[initializeApplicationState]');
            this._endPathState(ctx);
          },
      })
    );
  }

  @Action(ApplicationStateActions.SaveApplicationSettings)
  async saveApplicationSettings(
    ctx: StateContext<IApplicationStateModel>,
    { payload }: ApplicationStateActions.SaveApplicationSettings
  ) {
    this._startPathState(ctx);

    let settings = ctx.getState().settings;
    settings = {
      ...settings,
      ...payload,
    };

    return this._SettingsService.updateSettings(settings).pipe(
      first(),
      tap({
        next: (snewSetting) => {
          ctx.setState({
            isStateReady: true,
            settings: snewSetting,
            players: ctx.getState().players,
            games: ctx.getState().games,
          });

          this._successSnakBar('Application Settings Saved');
          this._endPathState(ctx);
        },
        error: (err) => {
          console.error('[saveApplicationSettings] - ', err);
          this._errorSnakBar('[saveApplicationSettings]');
          this._endPathState(ctx);
        },
      })
    );
  }

  @Action(ApplicationStateActions.AddPlayerApplicationState)
  addPlayerApplicationState(
    ctx: StateContext<IApplicationStateModel>,
    { payload }: ApplicationStateActions.AddPlayerApplicationState
  ) {
    this._startPathState(ctx);

    const currentPlayers = ctx.getState().players;
    const exists = currentPlayers.some(
      (item) => item.name.toLowerCase() === payload.name.toLowerCase()
    );

    if (exists) {      
      this._infoSnakBar('Player already added to the database');
      this._endPathState(ctx);
      return;
    }

    return this._PlayerService.addPlayer(payload).pipe(
      first(),
      tap({
        next: (player) => {
          ctx.patchState({
            players: [...currentPlayers, player],
          });
          this._successSnakBar('Player Added');
          this._endPathState(ctx);
        },
        error: (err) => {
          console.error('[addPlayerApplicationState] - ', err);
          this._errorSnakBar('[addPlayerApplicationState]');
          this._endPathState(ctx);
        },
      })
    );
  }

  @Action(ApplicationStateActions.DeletePlayerApplicationState)
  deletePlayerApplicationState(
    ctx: StateContext<IApplicationStateModel>,
    { id }: ApplicationStateActions.DeletePlayerApplicationState
  ) {
    this._startPathState(ctx);

    const currentPlayers = ctx.getState().players;
    const exists = currentPlayers.some(
      (item) => item.id === id
    );

    if (!exists) {
      this._endPathState(ctx);
      this._infoSnakBar('Player doesnt exist in the database');
      return;
    }

    return this._PlayerService.deletePlayer(id).pipe(
      tap({
        next: (players) => {
          console.log('[deletePlayerApplicationState] success - ', players);
          ctx.patchState({
            players: players,
          });
          this._successSnakBar('Player Deleted');
          this._endPathState(ctx);
        },
        error: (err) => {
          console.log('[deletePlayerApplicationState] error - ', id);
          console.error('[deletePlayerApplicationState] - ', err);
          this._errorSnakBar('[deletePlayerApplicationState]');
          this._endPathState(ctx);
        },
      })
    )
  }
}
