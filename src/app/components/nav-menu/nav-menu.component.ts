import {Component, OnInit, ViewChild} from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(private oauthService: OAuthService){}

  login(){
    console.log("login");
    this.oauthService.initImplicitFlow();
  }
  logout(){
    console.log("logout");
    this.oauthService.logOut();
  }

  get token(){
    let claims:any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
   }
}

