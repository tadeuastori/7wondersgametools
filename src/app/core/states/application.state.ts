import { Action, State, StateContext } from '@ngxs/store';
import { AppStoreKeys } from '../../store/store-keys.enum';
import {
  IApplicationStateModel,
  initialApplicationState,
} from '../models/state/application-state.model';
import { Injectable } from '@angular/core';
import { ApplicationStateActions } from './application.actions';
import {
  ApplicationSetting,
  IApplicationSettings,
} from '../models/state/application-state-settings.model';
import { ApplicationDataService } from '../services/application-data.service';
import { PlayerService } from '../services/player.service';
import { catchError, EmptyError, first, tap } from 'rxjs';
import { BaseState } from './base/base.state';

@State<IApplicationStateModel>({
  name: AppStoreKeys.ApplicationState,
  defaults: initialApplicationState,
})
@Injectable()
export class ApplicationState extends BaseState {
  constructor(
    private _applicationDataService: ApplicationDataService,
    private _PlayerService: PlayerService
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
  async initializeApplicationState(ctx: StateContext<IApplicationStateModel>) {
    this._startPathState(ctx);

    return this._PlayerService.getPlayers().pipe(
      first(),
      tap((player) => {
        ctx.patchState({
          isStateReady: true,
          settings: new ApplicationSetting() as IApplicationSettings,
          games: this._applicationDataService.getGameData(),
          players: player,
        });

        this._successSnakBar('Application State Initialized');
      }),
      catchError((err) => {
        console.error('[initializeApplicationState] - ', err);
        this._errorSnakBar('[initializeApplicationState]');
        this._endPathState(ctx);
        return '';
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
