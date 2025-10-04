import { Injectable } from '@angular/core';
import { Game } from '../models/game/game.model';
import { EGamesEnum } from '../enums/games.enum';

@Injectable({
  providedIn: 'root',
})
export class ApplicationDataService {
  constructor() {}

  private GameData: Game[] = [
    {
      name: '7 Wonders',
      description: '',
      version: 2,
      gameType: EGamesEnum.GAME_BASE,
      icon: '',
      expansions: [
        {
          name: 'Cities',
          description: '',
          icon: 'fort',
          wonders: [{ name: 'Petra' }, { name: 'Byzantium' }],
        },
        {
          name: 'Edifice',
          description: '',
          icon: 'apartment',
          wonders: [{ name: 'Ur' }, { name: 'Carthage' }],
        },
        {
          name: 'Leaders',
          description: '',
          icon: 'groups',
          wonders: [{ name: 'Roma' }, { name: 'Abu Simbel' }],
        },
        {
          name: 'Armada',
          description: '',
          icon: 'sailing',
          wonders: [{ name: 'Siracusa' }],
        },
      ],
      wonders: [
        { name: 'Rhodos' },
        { name: 'Olympia' },
        { name: 'Halikarnassus' },
        { name: 'Gizah' },
        { name: 'Alexandria' },
        { name: 'Ephesos' },
        { name: 'Babylon' },
      ],
    },
    {
      name: '7w - Duel',
      description: '',
      version: 1,
      gameType: EGamesEnum.GAME_DUEL,
      icon: '',
      expansions: [
        {
          name: 'Agora',
          description: '',
          icon: 'groups',
          wonders: [{ name: 'The Sanctuary' }, { name: 'The Divine Theater' }],
        },
        {
          name: 'Pantheon',
          description: '',
          icon: 'synagogue',
          wonders: [{ name: 'Curia Julia' }, { name: 'Knossos' }],
        },
      ],
      wonders: [
        { name: 'The Appian Way' },
        { name: 'The Statue of Zeus' },
        { name: 'The Temple of Artemis' },
        { name: 'The Mausoleum' },
        { name: 'The Hanging Gardens' },
        { name: 'The Great Lighthouse' },
        { name: 'The Sphinx' },
        { name: 'Piraeus' },
        { name: 'The Pyramids' },
        { name: 'Circus Maximus' },
        { name: 'The Colossus' },
        { name: 'The Great Library' },
      ],
    },
    {
      name: '7w - Architects',
      description: '',
      version: 1,
      gameType: EGamesEnum.GAME_ARCHITECTS,
      icon: '',
      expansions: [
        {
          name: 'Medals',
          description: '',
          icon: 'workspace_premium',
          wonders: [{ name: 'Ur' }, { name: 'Rome' }],
        },
      ],
      wonders: [
        { name: 'Rhodos' },
        { name: 'Olympia' },
        { name: 'Halikarnassus' },
        { name: 'Gizah' },
        { name: 'Alexandria' },
        { name: 'Ephesos' },
        { name: 'Babylon' },
      ],
    },
  ];

  public getGameData(): Game[] {
    return this.GameData;
  }
}
