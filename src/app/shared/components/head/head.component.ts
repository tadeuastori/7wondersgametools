import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { environment } from '../../../../environments/environment';
import { ApplicationMenuListService } from '../../../core/services/application-menu-list.service';
import { MatListModule } from '@angular/material/list';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-head',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './head.component.html',
  styleUrl: './head.component.less',
})
export class HeadComponent implements OnInit {
  appName: string = '7 Wonders Game Tools';
  mode: MatDrawerMode = 'over';
  appVersion: string = environment.appVersion;

  menuGroupList: Array<any>;

  constructor(
    _menuListService: ApplicationMenuListService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.menuGroupList = _menuListService.getFullMenuList();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.route.root;
          let titles: string[] = [];

          while (route.firstChild) {
            route = route.firstChild;
            if (route.snapshot.data) {
              const titleSymbol = Object.getOwnPropertySymbols(
                route.snapshot.data
              ).find((symbol) => route.snapshot.data[symbol] !== undefined);
              if (titleSymbol) {
                titles.push(route.snapshot.data[titleSymbol]);
              }
            }
          }

          return titles.join(' > ');
        })
      )
      .subscribe((title: string) => {
        this.appName = title || '7 Wonders Game Tools';
      });
  }
}
