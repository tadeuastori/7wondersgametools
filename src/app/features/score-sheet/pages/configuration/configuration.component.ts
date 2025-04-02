import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EGamesEnum } from '../../../../core/enums/games.enum';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BaseComponent } from '../../components/base.component';

import { MatTableModule } from '@angular/material/table';
import { IMatchPlayers, MatchPlayers } from '../../models/match-players.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerMatchComponent } from '../../components/dialog-add-player-match/dialog-add-player-match.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ApplicationStateSelectors } from '../../../../core/states/application.queries';
import { IGame } from '../../../../core/models/game/game.model';
import { MatchPlayerDataSource } from '../../models/match-player-datasource.model';
import { SortUtils } from '../../../../core/utils/sort.util';
import { IPlayer } from '../../../../core/models/player/player.model';
import { ApplicationStateActions } from '../../../../core/states/application.actions';
import {
  IPlayerRequest,
  PlayerRequest,
} from '../../../../core/models/player/player-request.model';
import { Observable, takeUntil } from 'rxjs';
import { IExpansion } from '../../../../core/models/game/expansions.model';
import { IWonder } from '../../../../core/models/game/wonder.model';
import { EWonderSide } from '../../../../core/enums/wonder-side.enum';

@Component({
    selector: 'app-configuration',
    imports: [
        MatToolbarModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatButtonToggleModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './configuration.component.html',
    styleUrl: './configuration.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationComponent extends BaseComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  applicationGames$: Observable<IGame[]>;
  applicationPlayersList$: Observable<IPlayer[]>;

  readonly newPlayer: IMatchPlayers = signal(new MatchPlayers());
  originalGameList: IGame[] = [];

  eGameType = EGamesEnum;
  gameType: EGamesEnum = EGamesEnum.GAME_BASE;
  expansionsList: Array<{ name: string; icon?: string; value: boolean }> = [];
  playersList: IMatchPlayers[] = [];
  wondersList: Array<{ name: string; icon?: string }> = [];

  dataSource = new MatchPlayerDataSource();
  dataSourceList: IMatchPlayers[] = [];
  displayedColumns: string[] = ['table-player', 'table-wonder', 'table-action'];

  isStartReady: boolean = false;

  constructor(private route: ActivatedRoute) {
    super();

    this.applicationGames$ = this._store.select(
      ApplicationStateSelectors.getApplicationGames
    );

    this.applicationPlayersList$ = this._store.select(
      ApplicationStateSelectors.getApplicationPlayers
    );
  }

  public ngOnInit(): void {
    this.gameType = this.route.snapshot.data['gameType'] as EGamesEnum;

    this._loadPlayerList();
    this._loadGameInfo();
  }

  public onChangeExpansionValue(idx: number): void {
    this.expansionsList[idx].value = !this.expansionsList[idx].value;

    this._loadWondersList();

    if (!this.expansionsList[idx].value) {
      this._loadDataSourceList();
    }
  }

  private _loadPlayerList(): void {
    this.playersList = [];

    this.applicationPlayersList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((players: IPlayer[]) => {
        players
          .filter((player: IPlayer) => player.name)
          .forEach((player: IPlayer) => {
            if (!this.playersList.map((p) => p.name).includes(player.name)) {
              this.playersList.push({
                id: player.id,
                name: player.name,
                wonder: undefined,
              });
            }
          });
      });

    this.playersList = SortUtils.sortByProperty(this.playersList, 'name');
  }

  private _loadGameInfo(): void {
    this.applicationGames$
      .pipe(takeUntil(this.destroy$))
      .subscribe((games: IGame[]) => {
        this.originalGameList = games.filter(
          (filter) => filter.gameType === this.gameType
        );
        games
          .filter(
            (games: IGame) =>
              games.gameType === this.gameType && games.name != ''
          )
          .forEach((game: IGame) => {
            game.expansions.forEach((gameExpansions: IExpansion) => {
              this.expansionsList.push({
                name: gameExpansions.name,
                icon: gameExpansions.icon,
                value: false,
              });
            });
          });

        this._loadWondersList();
        this.expansionsList = SortUtils.sortByProperty(
          this.expansionsList,
          'name'
        );
      });
  }

  private _loadWondersList(): void {
    this.wondersList = [];

    if (this.originalGameList.length === 0) return;

    this.originalGameList[0].wonders.forEach((wonders: IWonder) => {
      if (
        !this.dataSourceList.some((item) =>
          item.wonder?.some((wonder) => wonder.name === wonders.name)
        )
      ) {
        this.wondersList.push({ name: wonders.name, icon: '' });
      }
    });

    const selectedExpansion = new Set(
      this.expansionsList
        .filter((filter) => filter.value === true)
        .map((item) => item.name)
    );

    if (selectedExpansion) {
      const expansions = this.originalGameList[0].expansions?.filter((item) =>
        selectedExpansion.has(item.name)
      );

      expansions?.forEach((expansion: IExpansion) => {
        expansion.wonders?.forEach((wonder: IWonder) => {
          if (
            !this.dataSourceList.some((item) =>
              item.wonder
                ?.map((item) => item.name)
                .some((item) => item === wonder.name)
            )
          ) {
            this.wondersList.push({ name: wonder.name, icon: expansion.icon });
          }
        });
      });
    }

    this.wondersList = SortUtils.sortByProperty(this.wondersList, 'name');
  }

  private _loadDataSourceList(): void {
    if (this.dataSourceList.length > 0) {
      this.dataSourceList.forEach((player: IMatchPlayers) => {
        if (
          !this.wondersList.some((wonder) =>
            player.wonder?.some((item) => item.name === wonder.name)
          )
        ) {
          const wonder: Array<{ name: string; icon?: string }> = [{ name: '' }];

          player.wonder = wonder;
        }
      });

      this.dataSource.setData(this.dataSourceList);
    }
  }

  private _validatedConfiguration(): void {
    this.isStartReady =
      (this.gameType === this.eGameType.GAME_DUEL &&
        this.dataSourceList.length === 2) ||
      (this.dataSourceList.length >= 3 && this.dataSourceList.length <= 7);
  }

  public addPlayer(player: IMatchPlayers): void {
    const newPlayer = new PlayerRequest({
      name: player.name,
    }) as IPlayerRequest;

    if (!player.id) {
      this._store.dispatch(
        new ApplicationStateActions.AddPlayerApplicationState(newPlayer)
      );
    }

    const exist = this.dataSourceList.filter(
      (item) => item.name.toLowerCase() === player.name.toLowerCase()
    );

    if (exist.length > 0) {
      this._snackBar.open('player exists', 'close');

      return;
    }

    this.dataSourceList = [...this.dataSourceList, player];
    this.dataSource.setData(this.dataSourceList);

    this._loadWondersList();
    this._validatedConfiguration();
  }
  public removePlayer(idx: number): void {
    this.dataSourceList.splice(idx, 1);
    this.dataSource.setData(this.dataSourceList);
    this._loadWondersList();
  }

  public generateWonders(): void {
    const availableWonders = [...this.wondersList];

    this.dataSourceList
      .filter((item) => item.wonder?.length === 0)
      .forEach((item) => {
        if (availableWonders.length > 0) {
          const totalWonders = this.gameType === EGamesEnum.GAME_DUEL ? 4 : 1;
          let wonder: Array<{
            name: string;
            icon?: string;
            side?: EWonderSide;
          }> = [];

          const wonderValues = Object.values(EWonderSide);

          for (let i = 0; i < totalWonders; i++) {
            const wonderRandomIndex = Math.floor(
              Math.random() * availableWonders.length
            );
            const sideRandomIndex = Math.floor(
              Math.random() * wonderValues.length
            );

            wonder.push({
              name: availableWonders[wonderRandomIndex].name,
              icon: '',
              side:
                this.gameType === EGamesEnum.GAME_BASE
                  ? wonderValues[sideRandomIndex]
                  : undefined,
            });

            availableWonders.splice(wonderRandomIndex, 1);
          }

          item.wonder = wonder;
        }
      });
  }

  public startGame(): void {
    this._store.dispatch(
      new ApplicationStateActions.StartMatchApplicationState(
        this.gameType,
        this.expansionsList
          .filter((filter) => filter.value === true)
          .map((item) => item.name),
        this.dataSourceList
      )
    );
  }

  openSnackBar(message: string) {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    this._snackBar.open(message, 'Close', {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: 500 * 1000,
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerMatchComponent, {
      data: {
        wonders: this.wondersList,
        players: this.playersList,
        multipleWonders: this.gameType === EGamesEnum.GAME_DUEL,
        hasWonderSide: this.gameType === EGamesEnum.GAME_BASE,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        this.addPlayer(result);
      }
    });
  }
}
