export interface ILanguage {
    code: string;
    language: string;
    icon: string;
}

export class Language implements ILanguage {
    code: string;
    language: string;
    icon: string;

    constructor(clone?: ILanguage) {
        this.code = '';
        this.language = '';
        this.icon = '';

        if (clone) {
            this.code = clone.code;
            this.language = clone.language;
            this.icon = clone.icon;
        }
    }
}