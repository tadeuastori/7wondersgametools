import { ApplicationStateActionsTypes } from '../enums/application-state-actions-types.enum';
import { IApplicationSettings } from '../models/state/application-state-settings.model';

export namespace ApplicationStateActions {
  export class InitializeApplicationState {
    static readonly type =
      ApplicationStateActionsTypes.InitializeApplicationState;
  }

  export class SaveApplicationSettings {
    static readonly type = ApplicationStateActionsTypes.SaveApplicationSettings;
    constructor(public payload: IApplicationSettings) {}
  }
}
