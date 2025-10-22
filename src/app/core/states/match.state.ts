import { Injectable } from '@angular/core';
import { AppStoreKeys } from '../../store/store-keys.enum';
import {
  IMatchStateModel,
  initialMatchState,
} from '../models/state/match-state.model';
import { Action, State, StateContext } from '@ngxs/store';
import { MatchStateActions } from './match.action';
import { BaseState } from './base/base.state';
import { MatchRequest } from '../models/match/match-request.model';
import { MatchPlayer } from '../models/match/match-players.model';
import { MatchGameService } from '../services/match-game.service';
import { first, tap} from 'rxjs';
import { PlayerService } from '../services/player.service';
import { ApplicationDataService } from '../services/application-data.service';
import { IExpansion } from '../models/game/expansions.model';

@State<IMatchStateModel>({
  name: AppStoreKeys.MatchState,
  defaults: initialMatchState,
})
@Injectable()
export class MatchState extends BaseState {  
  constructor(private _matchGameService: MatchGameService, private _playerService: PlayerService, private _applicationDataService: ApplicationDataService) {
    super();
  }

  //################################################################################################

  @Action(MatchStateActions.InitializeMatchState)
  async initializeMatchState(ctx: StateContext<IMatchStateModel>) {
    this._startPathState(ctx);

    ctx.patchState({
      match: null,
    });

    this._successSnakBar('Match State Initialized');
    this._endPathState(ctx);
  }

  @Action(MatchStateActions.CreateAndStartMatch)
  async createAndStartMatchMatchApplicationState(
    ctx: StateContext<IMatchStateModel>,
    { gameType, expansions, players }: MatchStateActions.CreateAndStartMatch
  ) {
    this._startPathState(ctx);
    
    let matchToAdd = new MatchRequest();

    matchToAdd.gameType = gameType;
    matchToAdd.expansions = expansions;    

    players.forEach((player) => {

      let newMatchPlayer = new MatchPlayer();

      this._playerService.getPlayerById(player.id ?? 0).pipe(
        first())
        .subscribe((p) => {
          newMatchPlayer.player = p;
        });
      
      newMatchPlayer.wonder = player.wonder?.map((wonder) => ({
        name: wonder.name,
        icon: wonder.icon,
        side: wonder.side          
      })) ?? [];

      let selectedExpansions: IExpansion[] = [];

      expansions.forEach((expansion) => {
        if (expansion) {
          let exp = this._applicationDataService.getExpansionsFromGameType(gameType).find((e) => e.name === expansion.name);
          if (exp) selectedExpansions.push(exp);         
        }
      });      
            
      newMatchPlayer.generateStages(selectedExpansions);

      newMatchPlayer.group = player.group ?? 0;

      matchToAdd.players.push(newMatchPlayer);
    })

    console.log(matchToAdd);

    // return this._matchGameService.addMatch(matchToAdd).pipe(
    //   tap({
    //     next: (match) => {
    //       ctx.patchState({
    //         match: match,
    //       });

    //       this._successSnakBar('Match Added');
    //       this._endPathState(ctx);
    //     },
    //     error: (err) => {
    //       this._errorSnakBar('[' + this.createAndStartMatchMatchApplicationState.name + ']' + err);
    //       this._endPathState(ctx);
    //     },
    //   }));

    this._successSnakBar('Match Created');
    this._endPathState(ctx);
  }

  @Action(MatchStateActions.EndMatch)
  async endMatchApplicationState(ctx: StateContext<IMatchStateModel>) {
    this._startPathState(ctx);
    ctx.patchState({
      isStateReady: true,
    });

    this._successSnakBar('Match Ended');
  }
}
