import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { environment } from '../../../../environments/environment';
import { ApplicationMenuListService } from '../../../core/services/application-menu-list.service';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-head',
  standalone: true,
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

  constructor(_menuListService: ApplicationMenuListService) {
    this.menuGroupList = _menuListService.getFullMenuList();
  }

  ngOnInit(): void {}
}
