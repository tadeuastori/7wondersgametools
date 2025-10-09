export interface ISetting {
    id?: number;
    userLanguage: string;
}

export class Setting implements ISetting {
    id?: number;
    userLanguage: string;

    constructor(clone?: ISetting) {
        this.userLanguage = 'en';

        if (clone) {
            this.id = clone.id;
            this.userLanguage = clone.userLanguage;
        }
    }
}