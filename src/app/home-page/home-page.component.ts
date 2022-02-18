import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';
import jwt_decode from 'jwt-decode';
import { TokenInfo, UserInfo } from './interfaces/home-page-interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  private visible: boolean = true;
  public navClasses = {};
  public userInfo: UserInfo = {
    id: 1,
    profileImgUrl: '../../assets/profile_images/1.png',
    email: '',
  };
  public arrowClasses = {
    'closing-arrow': this.visible,
    'opening-arrow': !this.visible,
  };

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    let token = localStorage.getItem('id_token');
    let res: TokenInfo = jwt_decode(token ? token : '');
    console.log(res);
    this.userInfo.id = +res.sub;
    this.userInfo.profileImgUrl =
      '../../assets/profile_images/' +
      String((this.userInfo.id % 4) + 1) +
      '.png';
    this.userInfo.email = res.email;
  }

  public toogle(): void {
    this.visible = !this.visible;
    this.arrowClasses = {
      'closing-arrow': this.visible,
      'opening-arrow': !this.visible,
    };
    this.navClasses = {
      'closed-panel': !this.visible,
    };
  }

  public signOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
