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
import { first } from 'rxjs';

@State<IApplicationStateModel>({
  name: AppStoreKeys.ApplicationState,
  defaults: initialApplicationState,
})
@Injectable()
export class ApplicationState {
  constructor(
    private _applicationDataService: ApplicationDataService,
    private _PlayerService: PlayerService
  ) {}

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

  private _successSnakBar(message: string) {}

  private _errorSnakBar(message: string) {}

  private _warningSnakBar(message: string) {}

  private _infoSnakBar(message: string) {}

  @Action(ApplicationStateActions.InitializeApplicationState)
  async initializeApplicationState(ctx: StateContext<IApplicationStateModel>) {
    this._startPathState(ctx);

    this._PlayerService
      .getPlayers()
      .pipe(first())
      .subscribe({
        next: (player) => {
          ctx.setState({
            isStateReady: true,
            settings: new ApplicationSetting() as IApplicationSettings,
            games: this._applicationDataService.getGameData(),
            players: player,
          });
        },
        error: (err) => {
          console.log('[initializeApplicationState] - ' + err);
          this._errorSnakBar('[initializeApplicationState]');
          this._endPathState(ctx);
        },
      });
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

    const exists = currentPlayers.filter(
      (item) => item.name.toLowerCase() === payload.name.toLowerCase()
    );

    if (exists) {
      ctx.patchState({
        isStateReady: true,
      });
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
          },
          error: (err) => {
            console.log('[addPlayerApplicationState] - ' + err);
            this._endPathState(ctx);
          },
        });
    }
  }

  @Action(ApplicationStateActions.StartMatchApplicationState)
  async startMatchApplicationState(
    ctx: StateContext<IApplicationStateModel>,
    {
      game,
      expansions,
      players,
    }: ApplicationStateActions.StartMatchApplicationState
  ) {
    this._startPathState(ctx);
    //add logic to create new match
    ctx.patchState({
      isStateReady: true,
    });
  }
}
