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
    title: 'Score Sheet'
  },
  {
    path: ERoutePaths.ScoreSheetMenuGameBase,
    loadComponent: () => import('@score-sheet-configuration/configuration.component')
        .then((c) => c.ConfigurationComponent),
    title: 'Score Sheet > 7 Wonders',
    data: { gameType: EGamesEnum.GAME_BASE },
  },
  {
    path: ERoutePaths.ScoreSheetMenuDuel,
    loadComponent: () => import('@score-sheet-configuration/configuration.component')
        .then((c) => c.ConfigurationComponent),
    title: 'Score Sheet > 7w - Duel',
    data: { gameType: EGamesEnum.GAME_DUEL },
  },
  {
    path: ERoutePaths.ScoreSheetMenuArchitects,
    loadComponent: () => import('@score-sheet-configuration/configuration.component')
        .then((c) => c.ConfigurationComponent),
    title: 'Score Sheet > 7w - Architects',
    data: { gameType: EGamesEnum.GAME_ARCHITECTS },
  },
];
