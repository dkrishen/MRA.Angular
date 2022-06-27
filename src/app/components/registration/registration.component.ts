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

  ngOnInit(): void {  }

  submit(email: string, username: string, password: string, confirmPassword: string){  }

  login(){
    this.router.navigate(['/login']);
  }
}
