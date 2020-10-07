
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_URL } from './base-url';

@Injectable()
export class Service {
  emitMessage = new EventEmitter<string>();
  success = new EventEmitter<boolean>()
  token: string;
  admin = null;
  logged = false;
  expiresIn;
  user = '';
  validToken = false;
  constructor(private router: Router, private http: HttpClient) { }

  onLoggedIn(token: string, isAdmin: boolean, expiresIn: any, user: string) {
    this.token = token;
    this.admin = isAdmin;
    this.expiresIn = expiresIn;
    this.user = user;
    this.logged = true;
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresIn);
    localStorage.setItem('loggedIn', 'true');
    this.redirect();
  }
  redirect() {
    this.emitMessage.emit('Success');
    if (this.admin && this.token) {

      return this.router.navigate(['/harvest'])
    } else if (!this.admin && this.token) {

      return this.router.navigate(['/measure'])
    } else {
      return this.router.navigate(['/'])
    }
  }
  autoRedirect() {
    this.success.emit(true);
    this.emitMessage.emit('Trying auto login');
    setTimeout(redirect => {

      this.redirect();
    }, 1000)
  }
  //adminStatus
  tryAutoLogin() {
    this.success.emit(true);
    this.emitMessage.emit('Trying auto login');
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');

    if (!token || !expiresIn) {

      return;
    }
    this.http.get(BASE_URL.getBaseUrl() + '/adminStatus', {
      headers: {
        Autorization: token
      }
    })
      .subscribe((data: { admin, user: { username }, success }) => {
        if (data.success) {
          this.admin = data.admin;
          this.user = data.user.username;
          console.log(data)
          this.token = token;
          this.logged = true;
          this.expiresIn = expiresIn;
          localStorage.setItem('loggedIn', 'true');
          return this.autoRedirect();
        } else {
          console.log(data)
          return this.emitMessage.emit('Failed, please login again');
        }

      }),
      error => {
        return this.emitMessage.emit('Something went wrong, try again' + error)
      }
  }
  isLogged() {
    return this.logged;
  }
  logout() {
    this.user = '';
    this.logged = false;
    this.admin = null;
    this.token = '';
    this.expiresIn = '';
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/'])
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getUserName() {
    return this.user;
  }

  isAdmin() {
    return this.admin;
  }
  checkToken() {
    const checkToken = localStorage.getItem('token');
    const expires = localStorage.getItem('expiresIn');

    let currentTime = Date.now();
    let checkExpire = Number(expires) > currentTime;

    if (checkToken && checkExpire) {
      this.emitMessage.emit('Success');
      this.validToken = true;
    } else {

      this.emitMessage.emit('Please login again');
      localStorage.removeItem('token');
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('expiresIn');
      this.validToken = false;
      this.router.navigate(['/']);
    }
  }
}