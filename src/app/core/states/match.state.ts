import { Injectable } from '@angular/core';
import { AppStoreKeys } from '../../store/store-keys.enum';
import {
  IMatchStateModel,
  initialMatchState,
} from '../models/state/match-state.model';
import { Action, State, StateContext } from '@ngxs/store';
import { MatchStateActions } from './match.action';
import { BaseState } from './base/base.state';

@State<IMatchStateModel>({
  name: AppStoreKeys.MatchState,
  defaults: initialMatchState,
})
@Injectable()
export class MatchState extends BaseState {
  constructor() {
    super();
  }

  private _startPathState(ctx: StateContext<IMatchStateModel>) {
    ctx.patchState({
      isStateReady: false,
    });
  }

  private _endPathState(ctx: StateContext<IMatchStateModel>) {
    ctx.patchState({
      isStateReady: true,
    });
  }

  //################################################################################################

  @Action(MatchStateActions.InitializeMatchState)
  async initializeMatchState(ctx: StateContext<IMatchStateModel>) {
    this._startPathState(ctx);

    ctx.setState({
      isStateReady: true,
      isMatchStarted: false,
      match: null,
    });

    this._successSnakBar('Match State Initialized');

    this._endPathState(ctx);
  }

  @Action(MatchStateActions.CreateAndStartMatch)
  async createAndStartMatchMatchApplicationState(
    ctx: StateContext<IMatchStateModel>,
    { game, expansions, players }: MatchStateActions.CreateAndStartMatch
  ) {
    this._startPathState(ctx);
    // TODO: add logic to create new match
    ctx.patchState({
      isStateReady: true,
    });

    this._successSnakBar('Match Created');
  }

  @Action(MatchStateActions.EndMatch)
  async endMatchApplicationState(ctx: StateContext<IMatchStateModel>) {
    this._startPathState(ctx);
    ctx.patchState({
      isMatchStarted: false,
      isStateReady: true,
    });

    this._successSnakBar('Match Ended');
  }
}
