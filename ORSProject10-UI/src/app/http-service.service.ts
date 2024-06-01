import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'

@Injectable()

export class HttpServiceService {

  token = '';
  form = {
    message: '',
    error: false
  };

  userparams = {
    url: '',
    sessionExpiredMsg: '',
    methodType: '',
  };

  setToken(token) {
    console.log("HTTP SERVICE setToken started")
    this.token = localStorage.getItem('token');
    console.log("HTTP SERVICE setToken ended")
  }

  getToken() {
    console.log("HTTP SERVICE getToken started")
    console.log('Token = ' + localStorage.getItem('token'));
    console.log("HTTP SERVICE getToken eneded")
    return localStorage.getItem('token');
  }

  constructor(private router: Router, private httpClient: HttpClient) {

  }
  isLogout() {
    console.log("HTTP SERVICE islogout started")
    let JSESSIONID = localStorage.getItem('fname');
    if ((JSESSIONID == "null" || JSESSIONID == null) && (this.router.url != "/login"
      && this.router.url != "/Auth"
      && this.router.url != "/logout"
      && this.router.url != "/forgotpassword"
      && this.router.url != "/signup"
      && this.router.url != "/login/true"
    )) {
      console.log("JSESSIONID == NULL so the block run")
      this.form.message = "Your Session has been Expired! Please Re-Login";
      this.form.error = true;
      this.userparams.url = this.router.url;// to navigate the URI request.
      this.router.navigateByUrl("/login");
      console.log("RAHUL GOSWAMI");
      console.log("HTTP SERVICE islogout ended with returning true")
      return true;
    } else {
      console.log("JSESSION == NOT NULL so the else block run")
      console.log("HTTP SERVICE islogout ended with returning false")
      return false;
    }
  }

  get(endpoint, callback) {
    console.log("HTTP Service GET started")
    if (this.isLogout()) {
      console.log('inside isLogout() return true');
      return true;
    }
    console.log("HTTP CLIENT ")
    return this.httpClient.get(endpoint).subscribe((data) => {
      console.log('Data :: ' + data);
      callback(data);
    });
  }

  post(endpoint, bean, callback) {
    console.log("Http Service POST started")
    if (this.isLogout()) {
      console.log('inside isLogout return true')
      return true;
    }
    return this.httpClient.post(endpoint, bean).subscribe((data) => {
      console.log(data);
      callback(data);
    }, error => {
      console.log('ORS Error--', error);
    });
  }
}