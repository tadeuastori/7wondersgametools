export interface IApplicationSettings {
  isColorBlind: boolean;
}

export class ApplicationSetting implements IApplicationSettings {
  isColorBlind: boolean;

  constructor(clone?: ApplicationSetting) {
    this.isColorBlind = false;

    if (clone) {
      this.isColorBlind = clone.isColorBlind;
    }
  }
}
