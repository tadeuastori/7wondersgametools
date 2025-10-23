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
import { BaseComponent } from '../../pages/base.component';

import { MatTableModule } from '@angular/material/table';
import { IMatchPlayersList, MatchPlayersList } from '@score-sheet-menu/models/match-players-list.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
import { MatchStateActions } from '../../../../core/states/match.action';
import { configurationHasWonderValid, configurationIsReady } from '@score-sheet-menu/score-sheet.validation';
import { PLAYER_ALREADY_EXISTS_MATCH } from 'src/app/core/constants/snackbar-message';
import { TranslocoModule } from '@jsverse/transloco';
import { TitleBarComponent } from "src/app/shared/components/title-bar/title-bar.component";
import { ETitleBarAction } from 'src/app/core/enums/title-bar-action.enum';

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
    TranslocoModule,
    TitleBarComponent
],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationComponent extends BaseComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  applicationGames$: Observable<IGame[]>;
  applicationPlayersList$: Observable<IPlayer[]>;

  readonly newPlayer: IMatchPlayersList = signal(new MatchPlayersList());

  originalPlayersList: IPlayer[] = [];
  originalGameList: IGame[] = [];
  originalExpansionList: Array<{
    name: string;
    label: string;
    icon?: string;
    value: boolean;
    wondersList?: IWonder[];
  }> = [];

  availableWonderList: Array<{ name: string; icon?: string }> = [];

  eTitleBarAction = ETitleBarAction;
  eGameType = EGamesEnum;
  gameType: EGamesEnum = EGamesEnum.GAME_BASE;

  matchPlayerDataSource = new MatchPlayerDataSource();
  matchPlayersList: IMatchPlayersList[] = [];
  displayedColumns: string[] = ['table-player', 'table-wonder', 'table-action'];

  isStartReady: boolean = false;
  orderBy: any = 'asc';

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
    this.originalExpansionList[idx].value =
      !this.originalExpansionList[idx].value;

    this._loadWondersList();

    if (!this.originalExpansionList[idx].value) {
      this._refreshDataSourceList();
    }
  }

  private _loadPlayerList(): void {
    this.originalPlayersList = [];

    this.applicationPlayersList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((players: IPlayer[]) => {
        players
          .filter((player: IPlayer) => player.name)
          .forEach((player: IPlayer) => {
            if (
              !this.originalPlayersList.map((p) => p.name).includes(player.name)
            ) {
              this.originalPlayersList.push({
                id: player.id,
                name: player.name,
              });
            }
          });
      });

    this.originalPlayersList = SortUtils.sortByProperties(
      this.originalPlayersList,
      ['name']
    );
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
              this.originalExpansionList.push({
                name: gameExpansions.name,
                icon: gameExpansions.icon,
                label: gameExpansions.label,
                value: false,
                wondersList: gameExpansions.wonders,
              });
            });
          });

        this._loadWondersList();
        this.originalExpansionList = SortUtils.sortByProperties(
          this.originalExpansionList,
          ['name']
        );
      });
  }

  private _loadWondersList(resetList: boolean = false): void {
    this.availableWonderList = [];

    if (this.originalGameList.length === 0) return;

    this.originalGameList[0].wonders.forEach((wonders: IWonder) => {
      this.availableWonderList.push({
        name: wonders.name,
      });
    });

    this.originalExpansionList.forEach((expansion: any) => {
      if (expansion.value) {
        expansion.wondersList?.forEach((wonders: IWonder) => {
          this.availableWonderList.push({
            name: wonders.name,
            icon: expansion.icon,
          });
        });
      }
    });

    if(!resetList){
      this.matchPlayersList.forEach((player: IMatchPlayersList) => {
        player.wonder?.forEach((wonder: any) => {
          var idx = this.availableWonderList.findIndex(
            (item) => item.name === wonder.name
          );

          if (idx > -1) {
            this.availableWonderList.splice(idx, 1);
          }
        });
      });
    }

    this.availableWonderList = SortUtils.sortByProperties(
      this.availableWonderList,
      ['name']
    );
  }

  private _refreshDataSourceList(): void {
    if (this.matchPlayersList.length > 0) {
      this.matchPlayersList.forEach((player: IMatchPlayersList) => {
        player.wonder?.forEach((wonder: any) => {
          this.originalExpansionList.forEach((expansion: any) => {
            expansion.wondersList?.forEach((wonders: IWonder) => {
              if (wonders.name === wonder.name && !expansion.value) {
                player.wonder?.splice(player.wonder?.indexOf(wonder), 1);
              }
            });
          });
        });
      });
    }

    this.matchPlayerDataSource.setData(this.matchPlayersList);
  }

  private _validatedConfiguration(): void {
    const hasWonder = this.matchPlayersList.every(player =>
      configurationHasWonderValid(this.gameType, player.wonder?.length)
    );

    this.isStartReady = configurationIsReady(this.gameType, this.matchPlayersList.length, hasWonder);
  }

  public addPlayer(player: IMatchPlayersList): void {
    const newPlayer = new PlayerRequest({
      name: player.name,
    }) as IPlayerRequest;

    if (!player.id) {
      this._store.dispatch(
        new ApplicationStateActions.AddPlayerApplicationState(newPlayer)
      );
    }

    const exist = this.matchPlayersList.filter(
      (item) => item.name.toLowerCase() === player.name.toLowerCase()
    );

    if (exist.length > 0) {
      this._snackbarService.openDangerSnackBar(PLAYER_ALREADY_EXISTS_MATCH);
       
      return;
    }

    this.matchPlayersList = [...this.matchPlayersList, player];
    this.matchPlayerDataSource.setData(this.matchPlayersList);

    this._loadWondersList();
    this._validatedConfiguration();
  }
  public removePlayer(idx: number): void {
    this.matchPlayersList.splice(idx, 1);
    this.matchPlayerDataSource.setData(this.matchPlayersList);
    this._loadWondersList();
    this._validatedConfiguration();
  }

  public generateWonders(): void {
    const wonderValues = Object.values(EWonderSide);
    const sideRandomIndex = Math.floor(Math.random() * wonderValues.length);

    var hasPlayerWithoutWonder = this.matchPlayersList.some(
      (item) => !item.wonder?.length
    );

    if (!hasPlayerWithoutWonder) {
      this._loadWondersList(true);
    }
    const availableWonders = [...this.availableWonderList];

    this.matchPlayersList
      .filter(
        (item) =>
          (hasPlayerWithoutWonder && item.wonder?.length === 0) ||
          (!hasPlayerWithoutWonder && item.wonder?.length != 0)
      )
      .forEach((item) => {
        if (availableWonders.length > 0) {
          const totalWonders = this.gameType === EGamesEnum.GAME_DUEL ? 4 : 1;
          let wonder: Array<{
            name: string;
            icon?: string;
            side?: EWonderSide;
          }> = [];

          for (let i = 0; i < totalWonders; i++) {
            const wonderRandomIndex = Math.floor(
              Math.random() * availableWonders.length
            );

            wonder.push({
              name: availableWonders[wonderRandomIndex].name,
              icon: availableWonders[wonderRandomIndex].icon ?? '',
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

    this._loadWondersList();
    this._validatedConfiguration();
  }

  orderByPlayerName(): void {
    this.orderBy = this.orderBy === 'name:asc' ? 'name:desc' : 'name:asc';

    this.matchPlayersList = SortUtils.sortByProperties(
      this.matchPlayersList,
      [this.orderBy]
    );
    this.matchPlayerDataSource.setData(this.matchPlayersList);
  }

  public createAndStartMatch(): void {
    this._store.dispatch(
      new MatchStateActions.CreateAndStartMatch(
        this.gameType,        
        this.matchPlayersList,
        this.originalExpansionList
          .filter((filter) => filter.value === true)
          .map((item) => ({
            name: item.name,          
            icon: item.icon,
          })),
      )
    );
  }

  public dialogData(): MatDialogConfig<any> {
    const config = new MatDialogConfig<any>();

    config.data = {
      wonders: this.availableWonderList,
      multipleWonders: this.gameType === EGamesEnum.GAME_DUEL,
      hasWonderSide: this.gameType === EGamesEnum.GAME_BASE,
      matchPlayersIdList: this.matchPlayersList.map((item) => item.name),
    };

    return config;
  }
}
