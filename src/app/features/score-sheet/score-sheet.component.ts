import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { constGameList } from './constants/menu-game-list';

@Component({
    selector: 'app-score-sheet',
    imports: [MatButtonModule, MatIconModule, RouterModule],
    templateUrl: './score-sheet.component.html',
    styleUrl: './score-sheet.component.less'
})
export class ScoreSheetComponent implements OnInit, OnDestroy {
  gameList = constGameList;

  constructor() {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
