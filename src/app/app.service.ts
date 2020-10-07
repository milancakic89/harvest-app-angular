
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


export class Service {
  emitMessage = new EventEmitter<string>();
  success = new EventEmitter<boolean>()

  constructor(private router: Router, private http: HttpClient) { }

  onLoggedIn(token: string, isAdmin: boolean, expiresIn: any, user: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresIn);
    localStorage.setItem('loggedIn', 'true');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/'])
  }

  checkToken() {
    const checkToken = localStorage.getItem('token');
    const expires = localStorage.getItem('expiresIn');

    let currentTime = Date.now();
    let checkExpire = Number(expires) > currentTime;

    if (checkToken && checkExpire) {
      this.emitMessage.emit('Success');
    } else {

      this.emitMessage.emit('Please login again');
      localStorage.removeItem('token');
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('expiresIn');
      this.router.navigate(['/']);
    }
  }
}