import { Injectable } from '@angular/core';
import { Game } from '../models/game/game.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationDataService {
  constructor() {}

  private GameData: Game[] = [
    {
      name: '7w Game Base',
      description: '',
      version: 2,
      expansions: [
        {
          name: 'Cities',
          description: '',
          wonders: [],
        },
        {
          name: 'Edifice',
          description: '',
          wonders: [],
        },
        {
          name: 'Leaders',
          description: '',
          wonders: [],
        },
        {
          name: 'Armada',
          description: '',
          wonders: [],
        },
      ],
      wonders: [],
    },
    {
      name: '7w Duel',
      description: '',
      version: 1,
      expansions: [
        {
          name: 'Agora',
          description: '',
          wonders: [],
        },
        {
          name: 'Pantheon',
          description: '',
          wonders: [],
        },
      ],
      wonders: [],
    },
    {
      name: '7w Architects',
      description: '',
      version: 1,
      expansions: [
        {
          name: 'Medals',
          description: '',
          wonders: [],
        },
      ],
      wonders: [],
    },
  ];

  public getGameData(): Game[] {
    return this.GameData;
  }
}
