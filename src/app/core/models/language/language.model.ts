export interface ILanguage {
    code: string;
    name: string;
    icon: string;
}

export class Language implements ILanguage {
    code: string;
    name: string;
    icon: string;

    constructor(clone?: ILanguage) {
        this.code = '';
        this.name = '';
        this.icon = '';

        if (clone) {
            this.code = clone.code;
            this.name = clone.name;
            this.icon = clone.icon;
        }
    }
}