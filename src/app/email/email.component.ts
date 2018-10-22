import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { IEmailQueryResponse, IEmailJobQueueRequest, IEmailJobQueueResponse } from '../_models/response.model';

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
  public successMessage: string;

  constructor(private http: HttpClient, private router: Router, private emailService: EmailService) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) { 
    // Run a async query to validate the mongo query 
    console.log(changes);
  }

  submitEmail(): void {
    console.log(this.inputMongoQuery, this.inputEmailSubject, this.inputEmailText);

    // validate the mongo request
    this.emailService
    .validateMongoDBQuery(this.inputMongoQuery)
    .then((emailsResp: IEmailQueryResponse) => {
      // send the emails with the associated emails
      let emailJob: IEmailJobQueueRequest = {
        to_emails: emailsResp.emails,
        subject: this.inputEmailSubject,
        email_text: this.inputEmailText
      };
      this.emailService
      .queueEmailJob(emailJob)
      .then((resp: IEmailJobQueueResponse) => {
        if (resp !== undefined) {
          if(emailsResp.emails.length) {
            this.successMessage = "You're email is being sent to " + emailsResp.emails.length + " person 🤡";
          } else {
            this.successMessage = "You're email is being sent to " + emailsResp.emails.length + " people 🤡";
          }
        }
      },
      (reason) => {
        this.errorMessage = reason;
      });
    },
    (reason) => {
      this.errorMessage = reason;
    });
  }
}
