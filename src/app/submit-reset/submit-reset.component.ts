import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Service } from '../app.service';
import { BASE_URL } from '../base-url';

@Component({
  selector: 'app-reseting',
  templateUrl: './submit-reset.component.html',
  styleUrls: ['./submit-reset.component.css']
})
export class ResetingComponent implements OnInit {
  submiting = false;

  constructor(private service: Service, private http: HttpClient) { }

  ngOnInit(): void {
  }
  submit(form) {
    if (!form.valid) {
      this.submiting = false;
      return this.service.emitMessage.emit('Please check email fields')
    }
    this.submiting = true;
    const email = form.value.email;
    this.http.post(BASE_URL.getBaseUrl() + '/reset', { email: email })
      .subscribe((user: { success: boolean, message: string }) => {
        this.submiting = false;
        if (user.success) {
          this.service.success.emit(true);
          this.service.emitMessage.emit(user.message + ", Check email")
          this.submiting = false;
          console.log(this.submiting)

        } else {
          this.submiting = false;
          this.service.success.emit(false);
          return this.service.emitMessage.emit(user.message);

        }
      }),
      error => {
        this.submiting = false;
        this.service.success.emit(false);
        this.service.emitMessage.emit(error)
      };;
  }
}

