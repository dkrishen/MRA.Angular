import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authConfig } from './sso.config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // public get isLoggedIn() : boolean {
  //   return this.authService.isAuthenticated();
  // }

  constructor(private oauthService: OAuthService){
    this.configureSingleSignOn();
  }

  configureSingleSignOn(){
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    //this.oauthService.loadDiscoveryDocumentAndLogin(); //no works
  }

  // login(email: string, password: string){
  //   this.authService.login(email, password)
  //     .subscribe(res => {
  //       console.log(res)
  //     }, error => {
  //       alert('Wrong login or password')
  //     })
  // }

  // logout(){
  //   this.authService.logout()
  // }
}
