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
import { TranslocoModule } from "@jsverse/transloco";
import { BaseComponent } from '../base.component';
import { ERoutePaths } from 'src/app/core/enums/route-paths.enum';

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
  appName: string[] = [];
  mode: MatDrawerMode = 'over';
  appVersion: string = environment.appVersion;
  eRouter = ERoutePaths;

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

          return titles;
        })
      )
      .subscribe((title: string[]) => {
        this.appName = title.length > 0 ? title : ['application.app_name'];
      });
  }

  public isHome(): boolean {
    return this.router.url === '/';
  }

  goBack() {
    const currentUrl = this.router.url;

    const redirectToHome: string[] = [ERoutePaths.SettingsPlayers, ERoutePaths.SettingsWonders, ERoutePaths.SettingsApplication];

    const matchToHome = redirectToHome.find((path) => currentUrl.includes(path));
    if (matchToHome) {
      this.router.navigateByUrl('/');
      return;
    }

    const parentUrl = this.getParentUrl();
    this.router.navigateByUrl(parentUrl);
  }

  private getParentUrl(): string {
    const tree = this.router.parseUrl(this.router.url);
    const segments = tree.root.children['primary']?.segments ?? [];

    if (segments.length > 1) {
      segments.pop();
    }

    const parentUrl = '/' + segments.map((s) => s.path).join('/');
    return parentUrl || '/';
  }
}
