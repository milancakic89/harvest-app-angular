import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Service } from '../app.service';
import { BASE_URL } from '../base-url';




@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})

export class MeasurementComponent implements OnInit {

  measureData;
  fetched = false;
  constructor(private http: HttpClient,
    private service: Service) { }

  ngOnInit(): void {
    const token = this.service.getToken();
    this.http.get(BASE_URL.getBaseUrl() + '/measurement', {
      headers: {
        Autorization: token
      }
    })
      .subscribe((data) => {
        this.measureData = data;
        this.fetched = true;
      },
        error => {
                  this.service.success.emit(false);
                  this.service.emitMessage.emit(error)
        })
  }
  filter(form: NgForm) {
    const filter = form.value.filter;
    const token = this.service.getToken();
    const data = { prefix: filter }
    this.http.post(BASE_URL.getBaseUrl() + '/measurement', data, {
      headers: {
        Autorization: token
      }
    })
      .subscribe((data) => {
        this.measureData = data;
        this.service.success.emit(true);
        this.service.emitMessage.emit('Success')
        this.fetched = true;
      },
        error => {
          this.service.success.emit(false);
          this.service.emitMessage.emit(error)
        })
  }
  filterEmployee(form: NgForm) {
    const values = form.value;
    const data = { id: values.employee }
    if (!form.valid) {
      return;
    }
    const token = this.service.getToken();
    this.http.post(BASE_URL.getBaseUrl() + '/employee', data, {
      headers: {
        Autorization: token
      }
    })
      .subscribe((data) => {
        this.measureData = data;
        this.fetched = true;
        this.service.success.emit(true);
        this.service.emitMessage.emit('Success')
      },
        error => {
           this.service.success.emit(false);
           this.service.emitMessage.emit(error)
        })

  }
}
