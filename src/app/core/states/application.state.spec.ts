import { TestBed } from '@angular/core/testing';
import { ApplicationState } from './application.state';
import { ApplicationStateActions } from './application.actions';
import { State, StateContext } from '@ngxs/store';
import { IApplicationStateModel } from '../models/state/application-state.model';

describe('ApplicationState', () => {
  let applicationState: ApplicationState;
  let ctx: StateContext<IApplicationStateModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ApplicationState],
    });

    applicationState = TestBed.inject(ApplicationState);
    // ctx = TestBed.inject(StateContext);
  });
});
