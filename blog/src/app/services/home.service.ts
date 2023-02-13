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

  // get all blog post
  homeResponseByPagination(pageNo : number): Observable<HomeResponse> {
    return this.http.get<HomeResponse>(`${this.url}/posts?pageNo=${pageNo}`)
  }

  //blog details
  blogDetails(id: number): Observable<BlogDetails> {
    return this.http.get<BlogDetails>(`${this.url}/posts/${id}`)
  }

  //self create blog list
  myBlogList(): Observable<Array<BlogDetails>> {
    return this.http.get<Array<BlogDetails>>(`${this.url}/posts/myblog`)
  }

  //create blog post v2
  createPost(post: any , file : File): Observable<CreatePost> {
    console.log("post data ->>" +  post);

    //create post data object
    let postdata = {
      title: post.title, description: post.description
      , categoryId: post.category
    }
    let formData = new FormData();
    formData.append('file', file , file.name)
    //converting object to json
    formData.append('postData', JSON.stringify(postdata))


    return this.http.post<CreatePost>(`${this.url}/posts/v2`, formData)
  }

  //update blog post
  updatePost(id: number, post: CreatePost): Observable<CreatePost> {
    return this.http.put<CreatePost>(`${this.url}/posts/${id}`, post)
  }

  //delete blog post
  deletePost(id: number): Observable<string> {
    return this.http.delete(`${this.url}/posts/${id}`, { responseType: 'text' })
  }

  //delete blog post only by admin
  deletePostByAdmin(id: number): Observable<string> {
    return this.http.delete(`${this.url}/posts/admin/${id}`, { responseType: 'text' })
  }


  //create comment
  createComment(id: number, commment: {
    "body": string
  }): Observable<CreateComment> {
    return this.http.post<CreateComment>(`${this.url}/posts/${id}/comments`, commment)
  }

  //delete comment
  deleteComment(id: number, commentId: number, commment: CreateComment): Observable<string> {
    return this.http.post(`${this.url}/posts/${id}/comments/${commentId}`, commment, { responseType: 'text' })
  }



}
