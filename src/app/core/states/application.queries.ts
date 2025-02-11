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
    [ApplicationStateSelectors.getSlices.settings],
    (settings) => settings
  );

  static getApplicationGames = createSelector(
    [ApplicationStateSelectors.getSlices.games],
    (games) => games
  );

  static getApplicationPlayers = createSelector(
    [ApplicationStateSelectors.getSlices.players],
    (players) => players
  );

  static isStateReady = createSelector(
    [ApplicationStateSelectors.getSlices.isStateReady],
    (isStateReady) => isStateReady
  );
}
