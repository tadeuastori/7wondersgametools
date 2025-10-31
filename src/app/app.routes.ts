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
    children: [
      {
        path: ERoutePaths.ScoreSheetMenuArchitects,
        loadComponent: () => import('@score-sheet-configuration/configuration.component')
            .then((c) => c.ConfigurationComponent),
        title: 'application.routes.game_architects',
        data: { gameType: EGamesEnum.GAME_ARCHITECTS },
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
    ]
  },

  // {
  //   path: ERoutePaths.Settings,
  //   loadComponent: () => import('@settings/setting.component')
  //       .then((c) => c.SettingComponent),
  //   title: 'application.routes.score_sheet',
  //   children: []
  // },
  {
    path: ERoutePaths.SettingsPlayers,
    loadComponent: () => import('@settings/pages/players/players.component')
        .then((c) => c.PlayersComponent),
    title: 'application.routes.settings_players',
  },
  {
    path: ERoutePaths.SettingsWonders,
    loadComponent: () => import('@settings/pages/wonders/wonders.component')
        .then((c) => c.WondersComponent),
    title: 'application.routes.settings_wonders',
  },
  {
    path: ERoutePaths.SettingsApplication,
    loadComponent: () => import('@settings/pages/application/application.component')
        .then((c) => c.ApplicationComponent),
    title: 'application.routes.settings_application',
  }

  // ,{
  //   path: 'page_test',
  //   loadComponent: () => import('src/app/shared/components/stage-table/stage-table.component')
  //       .then((c) => c.StageTableComponent),
  //   title: 'application.routes.page_test',
  //   children: []
  // },
];
