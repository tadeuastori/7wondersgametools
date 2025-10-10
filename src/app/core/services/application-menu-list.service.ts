import { Injectable } from '@angular/core';
import { ERoutePaths } from '../enums/route-paths.enum';

@Injectable({
  providedIn: 'root',
})
export class ApplicationMenuListService {
  constructor() {}

  private menuList: Array<{
    order: number;
    iconName: string;
    label: string;
    active: boolean;
    items: Array<{
      order: number;
      iconName: string;
      label: string;
      routerLink: string;
      active: boolean;
    }>;
  }> = [
    {
      order: 0,
      iconName: 'home',
      label: '',
      active: true,
      items: [
        {
          order: 10,
          iconName: 'home',
          label: 'home',
          routerLink: '',
          active: true,
        },
      ],
    },
    {
      order: 10,
      iconName: 'calculate',
      label: 'game_tools',
      active: true,
      items: [
        {
          order: 10,
          iconName: 'scoreboard',
          label: 'score_sheet',
          routerLink: ERoutePaths.ScoreSheetMenu,
          active: true,
        },
      ],
    },
    {
      order: 20,
      iconName: 'analytics',
      label: 'metrics',
      active: false,
      items: [
        {
          order: 10,
          iconName: 'analytics',
          label: 'matches',
          routerLink: '',
          active: true,
        },
      ],
    },
    {
      order: 30,
      iconName: 'settings',
      label: 'settings',
      active: true,
      items: [
        {
          order: 10,
          iconName: 'group',
          label: 'players',
          routerLink: ERoutePaths.SettingsPlayers,
          active: true,
        },
        {
          order: 20,
          iconName: 'account_balance',
          label: 'wonders',
          routerLink: ERoutePaths.SettingsWonders,
          active: false,
        },
        {
          order: 30,
          iconName: 'settings_applications',
          label: 'application',
          routerLink: '',
          active: false,
        },
      ],
    },
    {
      order: 40,
      iconName: 'account_balance',
      label: 'information',
      active: false,
      items: [
        {
          order: 10,
          iconName: 'question_mark',
          label: 'rules',
          routerLink: '',
          active: true,
        },
      ],
    },
  ];

 public getFullMenuList() {
  return this.menuList
    .filter(menu => menu.active)
    .map(menu => ({
      ...menu,
      items: menu.items.filter(item => item.active)
    }));
}


  public getGroupList() {
    return this.menuList
      .filter(({ active }) => active)
      .map(({ order, iconName, label }) => ({
        order,
        iconName,
        label,
      }));
  }

  public getItemListByGroup(groupName: string) {
    const items = this.menuList
      .filter(({ label, active }) => active && label === groupName)
      .map(({ items }) => items);

    return items;
  }
}
