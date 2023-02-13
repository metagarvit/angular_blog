import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails, UserResponse } from '../interfaces/UserReponse';

@Injectable({
  providedIn: 'root'
})
/**
Contains all authentication related api
 */
export class AuthService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:8123/api'

  // login request
  userLogin(userData: any): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.url}/auth/login`, { usernameOrEmail: userData.username, password: userData.password })
  }

  // login request
  signUp(userData: any): Observable<any> {
    return this.http.post(`${this.url}/auth/register`,userData, {responseType: 'text'} )
  }
  // login request
  signUpV2(userData:  any , file : File): Observable<any> {
    //create user register data object
    let postdata = {
      name: userData.name, username: userData.username
      , email: userData.email
      , password: userData.password
    }
    let formData = new FormData();
    formData.append('file', file , file.name)
    //converting object to json
    formData.append('data', JSON.stringify(postdata))
    return this.http.post(`${this.url}/auth/v2/register`,formData, {responseType: 'text'} )
  }


  // user details
  userDetails(): Observable<any> {

    return this.http.get<UserDetails>(`${this.url}/userDetails` )
  }


  //change password
  changePassword(request : any): Observable<any> {
    return this.http.post(`${this.url}/changePassword` , {oldPassword : request.oldPassword , newPassword : request.newPassword},{responseType: 'text'} )
  }

  saveToken(token: string) {
    localStorage.setItem("token", token);
    return true;
  }

  saveRole(role: string) {
    localStorage.setItem("admin", role);
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

  isAdmin() : boolean {
    let token = localStorage.getItem("admin");
    if (token == undefined || token == '' || token == null) {
      return false;
    }
    else {
     if(token == 'true'){
      return true;
     }
     else{
      return false;
     }
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
