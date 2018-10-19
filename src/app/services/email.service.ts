import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { unescapeIdentifier } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient, private userService: UserService) { }

  public validateMongoDBQuery(mongoQuery: string): Promise<DefaultResponse> {
    console.log(this.userService.getAuthHeaders());
    return new Promise<DefaultResponse>((resolve, reject) => {
    this.http.post(environment.apiURI + "/validate_query",
      {query: JSON.stringify(mongoQuery)},
      {headers: this.userService.getAuthHeaders() })
      .toPromise()
      .then((validatedData: Object) => {
        console.log(validatedData);
        resolve({
          data: validatedData,
          isError: validatedData['error'] ? true : false,
          errorMessage: validatedData['error'] || undefined,
          
        } as DefaultResponse);
      }, 
      (reason) => {
        reject(reason);
      });
    });
  }
}
