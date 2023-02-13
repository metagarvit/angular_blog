import { ObserversModule } from '@angular/cdk/observers';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput, catchError, finalize, throwError } from 'rxjs';
import { LoaderService } from './loader.service';
import { NgIfContext } from '@angular/common';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class IntercepterService implements HttpInterceptor {


  constructor(private router: Router, public loadingService: LoaderService) { }



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   let  token = localStorage.getItem("token");
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " +token || "");
    const authReq = req.clone({ headers: headers_object });

    this.loadingService.show();
    let isLogin = false
    if (token == undefined || token == '' || token == null) {
    console.log("false");

      isLogin = false;
    }
    else {
      console.log("true");

      isLogin = true;
    }
    return next.handle(isLogin ? authReq : req).pipe(
      finalize(
        () =>  this.loadingService.hide()
      )
      , catchError(
        (error): ObservableInput<any> => {

          if (error instanceof HttpErrorResponse && !req.url.includes('/login')) {
            console.log(error.status);
            console.log(error.statusText);
            if (error.status === 401) {
              // window.location.href = "/login";
            }
          }
          return throwError(() => error);

        }
      )
    )





  }


}
