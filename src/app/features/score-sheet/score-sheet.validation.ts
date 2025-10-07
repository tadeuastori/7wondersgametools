import { EGamesEnum } from "src/app/core/enums/games.enum";

export function configurationIsReady(gameType: EGamesEnum, playersInTheMatch: number, hasWonder: boolean): boolean{

    var isValid = (
      (gameType === EGamesEnum.GAME_DUEL && 
        hasWonder &&
        playersInTheMatch === 2) ||

      (gameType === EGamesEnum.GAME_ARCHITECTS &&
        hasWonder &&
        playersInTheMatch >= 2 &&
        playersInTheMatch <= 7) ||

      (gameType === EGamesEnum.GAME_BASE &&
        hasWonder &&
        playersInTheMatch >= 3 &&
        playersInTheMatch <= 7)
      );
    
    return isValid;
}

export function configurationHasWonderValid(gameType: EGamesEnum, playerWonders: number = 0): boolean {

    var hasWonder = (
        ((gameType === EGamesEnum.GAME_BASE || gameType === EGamesEnum.GAME_ARCHITECTS) && playerWonders == 1) ||
        (gameType === EGamesEnum.GAME_DUEL && playerWonders == 4)
         );

    return hasWonder;
}