export interface IIcon {
    name: string;
    path: string;
}

export class Icon implements IIcon {
    name: string;
    path: string;

    constructor(clone: IIcon) {
        this.name = clone.name;
        this.path = clone.path;
    }
}