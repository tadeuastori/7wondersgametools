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
import { TranslocoDirective, TranslocoModule } from "@jsverse/transloco";
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-head',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    TranslocoModule
],
  templateUrl: './head.component.html',
  styleUrl: './head.component.less',
})
export class HeadComponent extends BaseComponent implements OnInit {
  appName: string = 'application.app_name';
  mode: MatDrawerMode = 'over';
  appVersion: string = environment.appVersion;

  menuGroupList: Array<any>;

  constructor(    
    _menuListService: ApplicationMenuListService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
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
        this.appName = title || 'application.app_name';
      });
  }

  undoPage() {
    window.history.back();
  }

  public isHome(): boolean {
    return this.router.url === '/';
  }
}
