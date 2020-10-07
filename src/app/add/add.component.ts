import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '../app.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BASE_URL } from '../base-url';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  token;
  denySubmit = false;
  constructor(private http: HttpClient,
    private service: Service,
    private router: Router) { }

  addVariety(form: NgForm) {
    this.denySubmit = true;
    const token = this.service.getToken();
    const variety = form.value.variety;

    if (!variety) {
      return;
    }
    if (variety.length < 3) {
      this.service.success.emit(false);
      return this.service.emitMessage.emit('Check variety length');
    }
    const data = { variety: variety }
    this.http.post(BASE_URL.getBaseUrl() + '/add/variety', data, {
      headers: {
        'Content-Type': 'application/json',
        Autorization: token
      }
    })
      .subscribe((data: { success: boolean, message: string }) => {
        if (!data.success) {
          this.denySubmit = false;
          this.service.success.emit(false);
          return this.service.emitMessage.emit(data.message);
        }
        this.denySubmit = false;
        form.value.variety = '';
        this.service.success.emit(true);
        this.service.emitMessage.emit(data.message);
      });
  }
  addEmployee(form: NgForm) {
    this.denySubmit = true;
    const values = form.value;
    const token = this.service.getToken();
    if (values.name.length < 3 || values.lastName.length < 3) {
      this.service.success.emit(false);
      this.service.emitMessage.emit('Check input lengths');
    }
    let data = {
      name: values.name,
      lastName: values.lastName,
      phone: values.phone
    }
    this.http.post(BASE_URL.getBaseUrl() + '/add/employee', data, {
      headers: {
        'Content-Type': 'application/json',
        Autorization: token
      }
    })
      .subscribe((data: { success: boolean, message: string }) => {
        if (!data.success) {
          this.service.success.emit(false);
          this.service.emitMessage.emit(data.message);
          return this.denySubmit = false;

        }
        this.service.success.emit(true);
        this.service.emitMessage.emit('Success')
        this.denySubmit = false;
      })

  }

  addSupervizor(form: NgForm) {
    this.denySubmit = true;
    const values = form.value;
    const token = this.service.getToken();
    if (
      values.supervizor.length < 3 ||
      values.email.length < 5 ||
      values.password.length < 5
    ) {
      this.service.success.emit(false);
      return this.service.emitMessage.emit('Check input length');
    }

    const data = {
      supervizor: values.supervizor,
      username: values.email,
      password: values.password
    }
    this.http.post(BASE_URL.getBaseUrl() + '/add/supervizor', data, {
      headers: {
        'Content-Type': 'application/json',
        Autorization: token
      }
    })
      .subscribe((data: { success: boolean, message: string }) => {
        if (!data.success) {
          this.service.success.emit(false);
          this.service.emitMessage.emit(data.message);
          return this.denySubmit = false;
        }
        this.service.success.emit(true);
        this.service.emitMessage.emit('Success');
        return this.denySubmit = false;
      })
  }
}
