import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from '../app.service';
import { BASE_URL } from '../base-url';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @ViewChild('day') day: ElementRef;
  @ViewChild('month') month: ElementRef;
  @ViewChild('year') year: ElementRef;
  @ViewChild('confirm') confirm: ElementRef;

  reportData = null;
  fetched = false;
  showCloseBtn = true;
  showBackBtn = false;
  currentMonth;
  constructor(private http: HttpClient,
    private service: Service) { }

  ngOnInit(): void {
    this.getToday();
  }
  getToday() {
    this.showBackBtn = false;
    const token = this.service.getToken();
    this.http.get(BASE_URL.getBaseUrl() + '/report', {
      headers: {
        Autorization: token
      }
    })
      .subscribe((data) => {
        this.reportData = data;
        this.fetched = true;
      },
        error => {
          this.service.success.emit(true);
          this.service.emitMessage.emit(error)
        })
  }
  submit(form: NgForm) {
    // event.preventDefault();
    const values = form.value;
    this.fetched = false;
    const date = new Date();
    //today params
    const todayDay = date.getDate();
    const todayMonth = date.getMonth();
    const todayYear = date.getFullYear();
    //requested params
    const day = values.day;
    const month = values.month;
    const year = values.year;

    //if today and requested are the same date, data is allready displayed
    if (todayDay == day && todayMonth == month && todayYear == year) {
      this.fetched = true;
      this.showCloseBtn = true;
      this.service.success.emit(false);
      this.service.emitMessage.emit("Current date not yet closed");
      return this.getToday();
    }

    this.reportData = null;
    let data = {
      day: day,
      month: month,
      year: year
    }
    const token = this.service.getToken();
    this.http.post(BASE_URL.getBaseUrl() + '/report/day', data, {
      headers: {
        Autorization: token
      }
    })
      .subscribe((data) => {
        this.service.success.emit(true);
        this.service.emitMessage.emit('Success');
        this.reportData = data;
        this.fetched = true;
        this.showCloseBtn = false;
        this.showBackBtn = true;
      },
        error => {
          this.service.success.emit(false);
          this.service.emitMessage.emit(error)
        })

  }

  closeDay(form: NgForm) {

    this.showCloseBtn = false;
    const confirmation = form.value.close.toUpperCase();
    if (confirmation.trim() != 'YES') {
      this.service.success.emit(false);
      this.service.emitMessage.emit('Confirmation must be YES to close the day');
      this.showCloseBtn = true;
    }
    this.showCloseBtn = false;
    const token = this.service.getToken();
    const data = {
      confirmation: confirmation
    }
    this.http.post(BASE_URL.getBaseUrl() + '/report/close', data, {
      headers: {
        Autorization: token
      }
    })
      .subscribe((data: { message }) => {
        this.service.emitMessage.emit(data.message);
        this.fetched = true;
        this.showCloseBtn = false;
        this.getToday();
      },
        error => {
          this.service.success.emit(true);
          this.service.emitMessage.emit(error)
        })
  }
}
