import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.authService.logout();
    }  
  }

  login(email: string, password: string){
    this.authService.login(email, password)
      .subscribe(res => {
        console.log(res)
        this.router.navigate(['']);
      }, error => {
        alert('Wrong login or password')
      })
  }

  registration(){
    console.log("login reg");
    this.router.navigate(['/registration'])
  }

}
