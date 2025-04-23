import { createPropertySelectors, createSelector } from '@ngxs/store';
import { IApplicationStateModel } from '../models/state/application-state.model';
import { ApplicationState } from './application.state';

export class ApplicationStateSelectors {
  static getSlices =
    createPropertySelectors<IApplicationStateModel>(ApplicationState);

  static getApplicationState = createSelector(
    [ApplicationState],
    (state) => state
  );

  static getApplicationSettings = createSelector(
    [this.getSlices.settings],
    (settings) => settings
  );

  static getApplicationGames = createSelector(
    [this.getSlices.games],
    (games) => games
  );

  static getApplicationPlayers = createSelector(
    [this.getSlices.players],
    (players) => players
  );

  static isStateReady = createSelector(
    [this.getSlices.isStateReady],
    (isStateReady) => isStateReady
  );
}
