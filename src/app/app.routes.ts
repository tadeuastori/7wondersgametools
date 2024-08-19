import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'page-not-found' },

  // TODO: add routes
  // {
  //   path: 'game-base',
  //   component: GameBaseComponent,
  //   children: [{ path: '', redirectTo: 'home', pathMatch: 'full' }],
  // },
];
