import { Injectable } from '@angular/core';

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
          label: 'Home',
          routerLink: '',
          active: true,
        },
      ],
    },
    {
      order: 10,
      iconName: 'calculate',
      label: 'Game Tools',
      active: true,
      items: [
        {
          order: 10,
          iconName: 'scoreboard',
          label: 'Score Sheet',
          routerLink: 'score-sheet-menu',
          active: true,
        },
      ],
    },
    {
      order: 20,
      iconName: 'analytics',
      label: 'Metrics',
      active: false,
      items: [
        {
          order: 10,
          iconName: 'analytics',
          label: 'Matches',
          routerLink: '',
          active: true,
        },
      ],
    },
    {
      order: 30,
      iconName: 'settings',
      label: 'Configuration',
      active: false,
      items: [
        {
          order: 10,
          iconName: 'group',
          label: 'Players',
          routerLink: '',
          active: true,
        },
        {
          order: 20,
          iconName: 'account_balance',
          label: 'Wonders',
          routerLink: '',
          active: true,
        },
      ],
    },
    {
      order: 40,
      iconName: 'account_balance',
      label: 'Information',
      active: false,
      items: [
        {
          order: 10,
          iconName: 'question_mark',
          label: 'Rules',
          routerLink: '',
          active: true,
        },
      ],
    },
  ];

  public getFullMenuList() {
    return this.menuList.filter(({ active }) => active);
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
