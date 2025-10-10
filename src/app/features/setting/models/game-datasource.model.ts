export interface IGameDataSource{
    game: string;
    expansion?: string;
    wonder: string;
}

export class GamesDataSource implements IGameDataSource{
    game: string;
    expansion?: string;
    wonder: string;

    constructor(clone?: IGameDataSource){
        this.game = '';
        this.expansion = '';
        this.wonder = '';

        if(clone){
            this.game = clone.game;
            this.expansion = clone.expansion;
            this.wonder = clone.wonder;
        }
    }
}