import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';
import { TokenInfo } from '../interfaces/TokenInfo';
import { UserInfo } from '../interfaces/UserInfo';

@Component({
  selector: 'app-authorized-user',
  templateUrl: './authorized-user.component.html',
  styleUrls: ['./authorized-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizedUserComponent implements OnInit {
  private visible:boolean = true;
  public userInfo:UserInfo = {
    id:1,
    profileImgUrl:'../../assets/profile_images/1.png',
    email:''
  }
  constructor(private authService:AuthService, private router:Router) { }
  
  arrowClasses = {
    "closing-arrow":this.visible,
    "opening-arrow":!this.visible
  }

  navClasses = {}

  toogle(){
    this.visible=!this.visible;
    this.arrowClasses = {
      "closing-arrow":this.visible,
      "opening-arrow":!this.visible
    }
  
    this.navClasses = {
      "closed-panel":!this.visible
    }
  }

  public signOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    let token = localStorage.getItem("id_token");
    let res:TokenInfo  = jwt_decode(token?token:'');
    this.userInfo.id = +res.sub;
    this.userInfo.profileImgUrl='../../assets/profile_images/'+String(this.userInfo.id % 4 + 1)+'.png';
    this.userInfo.email = res.email;
  }

}