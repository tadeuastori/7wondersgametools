import { Routes } from '@angular/router';
import { ScoreSheetComponent } from './features/score-sheet/score-sheet.component';
import { ConfigurationComponent } from './features/score-sheet/pages/configuration/configuration.component';
import { EGamesEnum } from './core/enums/games.enum';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home' },
  { path: '**', redirectTo: 'page-not-found' },

  // TODO: add routes
  {
    path: 'score-sheet-menu',
    component: ScoreSheetComponent,
    title: 'Score Sheet',
  },
  {
    path: 'score-sheet-menu/game-base',
    component: ConfigurationComponent,
    title: 'Score Sheet > 7 Wonders',
    data: { gameType: EGamesEnum.GAME_BASE },
  },
  {
    path: 'score-sheet-menu/duel',
    component: ConfigurationComponent,
    title: 'Score Sheet > 7w - Duel',
    data: { gameType: EGamesEnum.GAME_DUEL },
  },
  {
    path: 'score-sheet-menu/architects',
    component: ConfigurationComponent,
    title: 'Score Sheet > 7w - Architects',
    data: { gameType: EGamesEnum.GAME_ARCHITECTS },
  },
];
