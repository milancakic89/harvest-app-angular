import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '../app.service';
import { NgForm } from '@angular/forms';
import { BASE_URL } from '../base-url';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  showLoad = false;
  constructor(private http: HttpClient,
    private service: Service) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') && localStorage.getItem('expiresIn')) {
      this.service.success.emit(true);
      this.service.emitMessage.emit('Trying auto login');
      this.service.tryAutoLogin();
    }
  }
  submit(form: NgForm) {
    this.showLoad = true;
    const email = form.value.email;
    const password = form.value.password;
    this.http.post(BASE_URL.getBaseUrl() + '/login', { email: email, password: password })
      .subscribe((user: { token: string, message: string, success: boolean, expiresIn: string, admin: boolean, user: string }) => {
        this.showLoad = false;
        if (user.success) {
          this.service.success.emit(true);
          this.service.emitMessage.emit(user.message);
          return this.service.onLoggedIn(user.token, user.admin, user.expiresIn, user.user);
        }
        this.service.success.emit(false);
        this.service.emitMessage.emit(user.message);
      });
  }
}
