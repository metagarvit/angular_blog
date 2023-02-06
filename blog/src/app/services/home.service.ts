import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeResponse } from '../interfaces/HomeResponse';
import { BlogDetails } from '../interfaces/BlogDetails';
import { CreateComment } from '../interfaces/CreateComment';
import { CreatePost } from '../interfaces/CreatePost';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }
  url = 'http://localhost:8123/api'


  // get all blog post
  homeResponse(): Observable<HomeResponse> {
    return this.http.get<HomeResponse>(`${this.url}/posts`)
  }

  //blog details
  blogDetails( id : number): Observable<BlogDetails> {
    return this.http.get<BlogDetails>(`${this.url}/posts/${id}`)
  }

  //create blog post
  createPost(   post: CreatePost): Observable<string> {
    return this.http.post(`${this.url}/posts` , post , {responseType: 'text'} )
  }

  //update blog post
  updatePost(   id :  number ,  post: CreatePost): Observable<string> {
    return this.http.put(`${this.url}/posts/${id}` , post , {responseType: 'text'} )
  }

  //delete blog post
  deletePost(   id :  number): Observable<string> {
    return this.http.delete(`${this.url}/posts/${id}` ,{responseType: 'text'} )
  }


  //create comment
  createComment(  id :  number , commment: CreateComment): Observable<string> {
    return this.http.post(`${this.url}/posts/${id}` , commment , {responseType: 'text'} )
  }

}
