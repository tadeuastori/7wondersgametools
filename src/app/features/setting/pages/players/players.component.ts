import { Component, inject, OnInit } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { BaseComponent } from '../../base.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EGamesEnum } from '../../../../core/enums/games.enum';
import { AddPlayerComponent } from '../../../../shared/components/dialog/add-player/add-player.component';
import { MatDialog } from '@angular/material/dialog';
import { PlayerDataSource } from '../../models/players-datasource.model';
import { IPlayer } from '../../../../core/models/player/player.model';
import { Observable, takeUntil } from 'rxjs';
import { ApplicationStateSelectors } from '../../../../core/states/application.queries';
import { SortUtils } from '../../../../core/utils/sort.util';
import { IPlayerRequest, PlayerRequest } from '../../../../core/models/player/player-request.model';
import { ApplicationStateActions } from '../../../../core/states/application.actions';
import { PLAYER_ADD, PLAYER_ALREADY_EXISTS } from '../../../../core/constants/snackbar-message';

@Component({
  selector: 'app-players',
  imports: [MatToolbarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    TranslocoModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.less'
})
export class PlayersComponent extends BaseComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  applicationPlayersList$: Observable<IPlayer[]>;

  eGameType = EGamesEnum;

  displayedColumns: string[] = ['table-player', 'table-action'];
  playerDataSource = new PlayerDataSource();
  playersList: IPlayer[] = [];

  constructor() {
    super();

    this.applicationPlayersList$ = this._store.select(
      ApplicationStateSelectors.getApplicationPlayers
    );
  }

  public ngOnInit(): void {
    this._loadPlayerList();
    this._refreshDataSourceList();
  }

  private _refreshDataSourceList(): void {  
      this.playerDataSource.setData(this.playersList);
    }

  private _loadPlayerList(): void {
  
      this.applicationPlayersList$
        .pipe(takeUntil(this.destroy$))
        .subscribe((players: IPlayer[]) => {
          players
            .filter((player: IPlayer) => player.name)
            .forEach((player: IPlayer) => {
              if (
                !this.playersList.map((p) => p.name).includes(player.name)
              ) {
                this.playersList.push({
                  id: player.id,
                  name: player.name,
                });
              }
            });
        });
  
      this.playersList = SortUtils.sortByProperty(
        this.playersList,
        'name'
      );
    }

  public addPlayer(player: IPlayer): void {
      const newPlayer = new PlayerRequest({
        name: player.name,
      }) as IPlayerRequest;
  
      if (!player.id) {
        this._store.dispatch(
          new ApplicationStateActions.AddPlayerApplicationState(newPlayer)
        );
        this._snackbarService.openSuccessSnackBar(PLAYER_ADD);
      }
  
      const exist = this.playersList.filter(
        (item) => item.name.toLowerCase() === player.name.toLowerCase()
      );
  
      if (exist.length > 0) {
        this._snackbarService.openDangerSnackBar(PLAYER_ALREADY_EXISTS);
        return;
      }
  
      this.playersList = [...this.playersList, player];
      this.playerDataSource.setData(this.playersList.sort((a, b) => a.name.localeCompare(b.name)));

    }

  public removePlayer(idx: number): void {

    var playerToRemove = this.playersList[idx];
    
    if (playerToRemove.id) {
        this._store.dispatch(
          new ApplicationStateActions.DeletePlayerApplicationState(playerToRemove.id)
        );

        this.playersList.splice(idx, 1);
        this.playerDataSource.setData(this.playersList);
      }
  }

  public openDialog(): void {
      const dialogRef = this.dialog.open(AddPlayerComponent);
  
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result !== undefined) {
          this.addPlayer(result);
        }
      });
    }
}
