import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'app';

  public inputUsername: string;
  public inputPassword: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { }

  
  ngOnChanges(event) { }

  public async onSubmit() { 
    this.userService
    .login(this.inputUsername, this.inputPassword)
    .then((user) => {
      console.log("need to nav");
      this.router.navigate(['/email']);
    },
    (reason) => {
      console.log(reason);
    });
  }

}
