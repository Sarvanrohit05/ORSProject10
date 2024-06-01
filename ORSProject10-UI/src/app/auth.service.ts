import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpServiceService } from './http-service.service';
import { RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root' 
})
export class AuthService implements HttpInterceptor {

  constructor(private http: HttpServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    console.log("Auth Service intercept Started");
    if (localStorage.getItem('fname') && localStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          "withCredentials": "true",
          "name": "Rahul",  
          Authorization: this.http.getToken()
        }
      })
      console.log("Auth Service intercept Ended");
    }
    console.log(req.headers.get("Authorization") + " = Authorization")
    return next.handle(req);
  }
}

[
  RouterLink
]