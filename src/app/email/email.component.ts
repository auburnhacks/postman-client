import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit, OnChanges {

  public inputMongoQuery: string;
  public inputEmailSubject: string;
  public inputEmailText: string;
  public errorMessage: string;

  constructor(private http: HttpClient, private router: Router, private emailService: EmailService) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) { 
    // Run a async query to validate the mongo query 
    console.log(changes);
  }

  submitEmail() {
    console.log(this.inputMongoQuery, this.inputEmailSubject, this.inputEmailText);
    this.emailService.
    validateMongoDBQuery(this.inputMongoQuery)
    .then((resp: DefaultResponse) => {
      console.log(resp);
    }, (reason) => {
      console.log(reason);
    })
  }
}
