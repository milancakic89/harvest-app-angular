import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Service } from '../app.service';
import { BASE_URL } from '../base-url';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  updating = false;
  resetToken = "";
  user;
  id;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private service: Service) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.resetToken = params['token'];
    });
    this.http.get(BASE_URL.getBaseUrl() + `/reset/${this.resetToken}`)
      .subscribe((data: { message, success, user: { _id } }) => {
        if (data.success) {
          this.user = data.user;
          this.id = data.user._id;
          this.service.success.emit(true);
          return this.service.emitMessage.emit('Success')
        }
        this.service.success.emit(false);
        this.service.emitMessage.emit(data.message)
      })
  }
  reset(form: NgForm) {
    const password = form.value.password;
    const repeat = form.value.repeat;
    const id = this.id;
    this.updating = true;
    if (!form.valid && password !== repeat) {
      return;
    }
    this.http.post(BASE_URL.getBaseUrl() + `/change`, { id: id, password: password })
      .subscribe((data: { message, success }) => {
        this.updating = false;
        if (data.success) {
          this.service.success.emit(true);
          this.service.emitMessage.emit('Success');
          return this.router.navigate(['/'])
        }
        this.service.success.emit(false);
        this.service.emitMessage.emit(data.message)
      })
  }

}
