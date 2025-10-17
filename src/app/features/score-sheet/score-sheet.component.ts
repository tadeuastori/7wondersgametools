import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { constGameList } from './constants/menu-game-list';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
    selector: 'app-score-sheet',
    imports: [MatButtonModule, MatIconModule, RouterModule, TranslocoModule],
    templateUrl: './score-sheet.component.html',
    styleUrl: './score-sheet.component.less'
})
export class ScoreSheetComponent implements OnInit, OnDestroy {
  gameList = constGameList;

  constructor(private router: Router) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  hasChildRoute(): boolean {
    // Verifica se a URL atual contém mais de 1 segmento
    return this.router.url.split('/').length > 2;
  }
}
