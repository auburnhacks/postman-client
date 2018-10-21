import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public inputUsername: string;
  public inputPassword: string;
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { }

  public async onSubmit() { 
    this.userService
    .login(this.inputUsername, this.inputPassword)
    .then((user) => {
      this.router.navigate(['/email']);
    },
    (reason) => {
      console.log(reason);
    });
  }
}
