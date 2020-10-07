import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '../app.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BASE_URL } from '../base-url';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  submiting = false;
  constructor(private http: HttpClient,
    private service: Service,
    private router: Router) { }

  submit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const repeatPassword = form.value.repeatPassword;
    if (password !== repeatPassword) {
      this.service.emitMessage.emit('Password fields do not match');
      return;
    }
    this.submiting = true;
    this.http.post(BASE_URL.getBaseUrl() + '/signup', { email: email, password: password, name: name })
      .subscribe((user: { success: boolean, message: string }) => {
        this.submiting = false;
        if (user.success) {
          this.service.success.emit(true);
          this.service.emitMessage.emit(user.message)
          setTimeout(() => {
            return this.router.navigate(['/'])
          }, 1500)

        } else {
          this.service.success.emit(false);
          return this.service.emitMessage.emit(user.message);
        }

      },
        error => {
          this.service.success.emit(true);
          this.service.emitMessage.emit(error)
        })
  }
}
