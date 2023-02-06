import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../interfaces/UserReponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:8123/api/auth'

  // login request
  userLogin(userData: any): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.url}/login`, { usernameOrEmail: userData.username, password: userData.password })
  }

  // login request
  signUp(userData: any): Observable<any> {
    let str = "text"
    return this.http.post(`${this.url}/register`,userData, {responseType: 'text'} )
  }

  saveToken(token: string) {
    localStorage.setItem("token", token);
    return true;
  }

  isLoggedIn() : boolean {
    let token = localStorage.getItem("token");
    if (token == undefined || token == '' || token == null) {
      localStorage.clear();
      return false;
    }
    else {
      return true;
    }
  }


  logout(){
    localStorage.clear()
    return true  ;
  }


  getToken(){
    return  localStorage.getItem("token")
  }
}
