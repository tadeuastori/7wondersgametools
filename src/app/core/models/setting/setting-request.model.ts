export interface ISettingsRequest {
  userLanguage: string;
}

export class SettingRequest implements ISettingsRequest {
  userLanguage: string;

  constructor(clone?: ISettingsRequest) {
    this.userLanguage = '';

    if (clone) {
      this.userLanguage = clone.userLanguage;
    }
  }
}
