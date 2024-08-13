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

@State<IApplicationStateModel>({
  name: AppStoreKeys.ApplicationState,
  defaults: initialApplicationState,
})
@Injectable()
export class ApplicationState {
  constructor() {}

  @Action(ApplicationStateActions.InitializeApplicationState)
  async initializeApplicationState(ctx: StateContext<IApplicationStateModel>) {
    ctx.setState({
      settings: new ApplicationSetting() as IApplicationSettings,
      games: [],
      players: [],
    });
  }

  @Action(ApplicationStateActions.SaveApplicationSettings)
  async saveApplicationSettings(
    ctx: StateContext<IApplicationStateModel>,
    { payload }: ApplicationStateActions.SaveApplicationSettings
  ) {
    let settings = ctx.getState().settings;
    settings = {
      ...settings,
      ...payload,
    };

    ctx.setState({
      settings: settings,
      players: ctx.getState().players,
      games: ctx.getState().games,
    });
  }
}
