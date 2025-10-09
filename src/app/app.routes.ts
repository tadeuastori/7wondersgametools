import { Routes } from '@angular/router';
import { EGamesEnum } from './core/enums/games.enum';
import { ERoutePaths } from './core/enums/route-paths.enum';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home' },
  { path: '**', redirectTo: 'page-not-found' },

  // TODO: add routes
  {
    path: ERoutePaths.ScoreSheetMenu,
    loadComponent: () => import('@score-sheet-menu/score-sheet.component')
        .then((c) => c.ScoreSheetComponent),
    title: 'application.routes.score_sheet',
  },
  {
    path: ERoutePaths.ScoreSheetMenuGameBase,
    loadComponent: () => import('@score-sheet-configuration/configuration.component')
        .then((c) => c.ConfigurationComponent),
    title: 'application.routes.game_base',
    data: { gameType: EGamesEnum.GAME_BASE },
  },
  {
    path: ERoutePaths.ScoreSheetMenuDuel,
    loadComponent: () => import('@score-sheet-configuration/configuration.component')
        .then((c) => c.ConfigurationComponent),
    title: 'application.routes.game_duel',
    data: { gameType: EGamesEnum.GAME_DUEL },
  },
  {
    path: ERoutePaths.ScoreSheetMenuArchitects,
    loadComponent: () => import('@score-sheet-configuration/configuration.component')
        .then((c) => c.ConfigurationComponent),
    title: 'application.routes.game_architects',
    data: { gameType: EGamesEnum.GAME_ARCHITECTS },
  },
  {
    path: ERoutePaths.SettingsWonders,
    loadComponent: () => import('@settings/wonders/wonders.component')
        .then((c) => c.WondersComponent),
    title: 'application.routes.settings_wonders',
  }
];
