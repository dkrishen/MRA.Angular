import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public get isLoggedIn() : boolean {
    return this.authService.isAuthenticated();
  }

  constructor(private authService: AuthService){}

  login(email: string, password: string){
    this.authService.login(email, password)
      .subscribe(res => {
        console.log(res)
      }, error => {
        alert('Wrong login or password')
      })
  }

  logout(){
    this.authService.logout()
  }
}
