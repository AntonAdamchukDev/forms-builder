import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';
import { Token, User } from './interfaces/home-page-interfaces';
import { generateProfileIconUrl } from './utils/home-page-functions';
import jwt_decode from 'jwt-decode';
import { initialUser } from './constants/home-page-constansts';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  private headerPanelVisibility: boolean = true;
  public headerPanelClasses = {};
  public user: User = initialUser;
  public arrowClasses = {
    'closing-arrow': this.headerPanelVisibility,
    'opening-arrow': !this.headerPanelVisibility,
  };

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    let token = localStorage.getItem('id_token');
    let res: Token = jwt_decode(token ? token : '');
    this.user.id = +res.sub;
    this.user.profileImgUrl = generateProfileIconUrl(this.user.id);
    this.user.email = res.email;
  }

  public toogleHeaderPanel(): void {
    this.headerPanelVisibility = !this.headerPanelVisibility;
    this.arrowClasses = {
      'closing-arrow': this.headerPanelVisibility,
      'opening-arrow': !this.headerPanelVisibility,
    };
    this.headerPanelClasses = {
      'closed-panel': !this.headerPanelVisibility,
    };
  }

  public signOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
