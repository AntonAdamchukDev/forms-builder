import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-authorized-user',
  templateUrl: './authorized-user.component.html',
  styleUrls: ['./authorized-user.component.scss']
})
export class AuthorizedUserComponent implements OnInit {
  //create profile img using store
  private visible:boolean = true;
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
    console.log(this.visible, this.navClasses,this.arrowClasses);
  }

  public signOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
  }

}
