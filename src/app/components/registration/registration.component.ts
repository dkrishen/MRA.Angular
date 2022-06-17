import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.authService.logout();
    }
  }

  submit(email: string, username: string, password: string, confirmPassword: string){
    if(password == confirmPassword){
      this.authService.registration(email, password, username)
        .subscribe(res => {
          console.log(res)
          this.router.navigate(['']);
        }, error => {
          alert('Wrong login or password')
        })
      }
  }

  login(){
    this.router.navigate(['/login']);
  }
}
