import { Component, OnInit, signal } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoModule } from '@jsverse/transloco';
import { IGame } from 'src/app/core/models/game/game.model';
import { GamesDataSource } from '../../models/games-datasource.model';
import { Observable, takeUntil } from 'rxjs';
import { ApplicationStateSelectors } from 'src/app/core/states/application.queries';
import { SortUtils } from 'src/app/core/utils/sort.util';
import { IExpansion } from 'src/app/core/models/game/expansions.model';
import { IWonder } from 'src/app/core/models/game/wonder.model';
import { IGameDataSource } from '../../models/game-datasource.model';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-wonders',
  imports: [MatToolbarModule,
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    TranslocoModule, MatExpansionModule],
  templateUrl: './wonders.component.html',
  styleUrl: './wonders.component.less'
})
export class WondersComponent extends BaseComponent implements OnInit {
  readonly panelOpenState = signal(false);

  applicationGamesList$: Observable<IGame[]>;

  displayedColumns: string[] = ['table-game', 'table-expansion', 'table-wonder'];
  gameDataSource = new GamesDataSource();

  gameList: IGame[] = [];

  constructor() {
    super();

    this.applicationGamesList$ = this._store.select(
      ApplicationStateSelectors.getApplicationGames
    );
  }
  ngOnInit(): void {
    this._loadGameList()
  }

  private _loadGameList(): void {
  
      this.applicationGamesList$
        .pipe(takeUntil(this.destroy$))
        .subscribe((games: IGame[]) => {

          this.generateGameDataSource(games);

          this.gameList = games;
        });
  }

  private generateGameDataSource(gamesList: IGame[]): void {
    
    var newGameDataSource: IGameDataSource[] = [];

    gamesList.forEach((game: IGame) => {
      game.wonders.forEach((wonder: IWonder) => {
        newGameDataSource.push({
          game: game.name,
          wonder: wonder.name,
        });
      });

      game.expansions.forEach((expansion: IExpansion) => {
        expansion.wonders?.forEach((wonder: IWonder) => {
          newGameDataSource.push({
            game: game.name,
            expansion: expansion.name,
            wonder: wonder.name,
          });
        });
      });

    });

    var sortedList = SortUtils.sortByProperties(
      newGameDataSource,
      ['game', 'expansion:desc', 'wonder']
    );

    this.gameDataSource.setData(sortedList);

  }

  public orderWondersList(wonders: IWonder[] | undefined): IWonder[] {

    if (!wonders) {
      return [];
    }

    return SortUtils.sortByProperties(
      wonders,
      ['name']
    );
  }

}
