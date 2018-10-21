import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user.model';
import { environment } from 'src/environments/environment';

const USER_LOCAL_STORAGE_KEY: string = "current_user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: User;

  constructor(private http: HttpClient) { 
    // search for the current user in local storage
    if (localStorage.getItem(USER_LOCAL_STORAGE_KEY) == undefined) {
      this.currentUser = undefined;
    } else {
      this.currentUser = UserService.loadUserFromLocalStorage(); 
    }
  }


 private static loadUserFromLocalStorage(): User {
   return undefined;
 }

 public isAuthenticated(): Promise<boolean> | boolean {
    if (this.getToken() !== undefined) {
      return true;
    }
    return false;
 }

 public login(username: string, password: string): Promise<User> {
   return new Promise<User>((resolve, reject) => {
     this.http
     .post(environment.apiURI + "/token", {username, password}, {headers: UserService.getDefaultHeaders()})
     .toPromise()
     .then((userData) => {
       let newUser = new User(username, userData['token'], userData['expiresIn']);
       this.currentUser = newUser;
       UserService.saveUserToLocalStorage(this.currentUser);
       resolve(newUser);
     },
     (reason) => { 
       reject(reason);
      });
   });
 }

 private static saveUserToLocalStorage(user: User): Promise<boolean> {
   return new Promise<boolean>((resolve, reject) => {
     localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
     resolve(true);
   });
 }

 private refreshToken(): Promise<boolean> {
   return new Promise<boolean>((resolve, reject) => {
     this.http.post(environment.apiURI + "/token/refresh", {token: this.currentUser.token}, {headers: UserService.getDefaultHeaders()})
     .toPromise()
     .then((tokenData) => {
       let user = new User(this.currentUser.username, tokenData['token'], tokenData['expires_in']);
       UserService.saveUserToLocalStorage(user);
       resolve(true);
     }, (reason) => reject(false));
   });
 }

 private getToken(): string {
   return localStorage.getItem(USER_LOCAL_STORAGE_KEY) || undefined;
 }

 public getAuthHeaders(): HttpHeaders {
  let headers = new HttpHeaders();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + this.getToken());
  return headers;
}

 public static getDefaultHeaders() : HttpHeaders {
   let headers = new HttpHeaders();
   headers.append('Content-Type', 'application/json');
   return headers;
 }
}
