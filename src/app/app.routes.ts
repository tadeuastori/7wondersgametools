import { Routes } from '@angular/router';
import { ScoreSheetComponent } from './features/score-sheet/score-sheet.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home' },
  { path: '**', redirectTo: 'page-not-found' },

  // TODO: add routes
  {
    path: 'score-sheet-menu',
    component: ScoreSheetComponent,
    title: 'Score Sheet',
    // children: [{ path: '', redirectTo: 'home', pathMatch: 'full' }],
  },
];
