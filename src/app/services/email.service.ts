import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { IEmailQueryResponse, IEmailJobQueueResponse, IEmailJobQueueRequest } from '../_models/response.model';

@Injectable({
  providedIn: 'root'
})

export class EmailService {
  
  constructor(private http: HttpClient, private userService: UserService) { }

  public validateMongoDBQuery(mongoQuery: string): Promise<IEmailQueryResponse> {
      return new Promise<IEmailQueryResponse>((resolve, reject) => {
          this.http
          .post<IEmailQueryResponse>(environment.apiURI + "/quill/query", {"query": JSON.parse(mongoQuery) })
          .toPromise()
          .then((emails: IEmailQueryResponse) => {
            resolve(emails);
          }, (reason) => reject(reason));
      });
  }

  public queueEmailJob(job: IEmailJobQueueRequest): Promise<IEmailJobQueueResponse> {
    return new Promise<IEmailJobQueueResponse>((resolve, reject) => {
      this.http
      .post(environment.apiURI + "/email/queue", job)
      .toPromise()
      .then((resp) => {
        resolve(resp);
      },
      (reason) => reject(reason));
    });
  }
}
