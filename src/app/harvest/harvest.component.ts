import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { Service } from '../app.service';
import { NgForm } from '@angular/forms';
import { BASE_URL } from '../base-url';

@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrls: ['./harvest.component.css']
})
export class HarvestComponent implements OnInit {
  @ViewChild('barcodes') barcodes: ElementRef;

  employees: [];
  prefix: string;
  fetched = false;
  boxesArray = [];
  selected;
  fetchingBarcodes = false;
  fetchingInitData = true;
  retry = true;
  printed = false;
  varietyArray = [];
  currentDate: number;

  constructor(private http: HttpClient,
    private service: Service,
    private router: Router) { }

  ngOnInit(): void {
    let date = new Date();
    this.currentDate = date.getDate();
    let month = String(date.getMonth() + 1);
    if (Number(month) < 10) {
      month = `0${month}`;
    }
    let year = String(date.getFullYear());
    let shortYear = year.slice(2, 4);
    let prefix = month + shortYear;

    const token = this.service.getToken();
    this.http.get(BASE_URL.getBaseUrl() + '/', {
      headers: {
        Autorization: token
      }
    })
      .subscribe(
        (data: { employees, boxFixedPrefix, variety: [] }) => {
          this.fetchingInitData = false;
          this.varietyArray = data.variety;
          this.employees = data.employees;
          this.selected = data.employees
          this.prefix = data.boxFixedPrefix || prefix;
        },
        error => {
          throw new Error(error);

        })
  }
  submit(form: NgForm) {
    const token = this.service.getToken();
    this.fetchingBarcodes = true;
    const values = form.value;
    if (!form.valid) {
      this.fetchingBarcodes = false;
      this.service.success.emit(false);
      return this.service.emitMessage.emit('Check required fields')

    }
    else {
      this.service.success.emit(true);
      this.service.emitMessage.emit('Success')

      let data = {
        boxNamePrefix: values.filter.toUpperCase(),
        boxPrefix: values.date,
        sector: values.sector,
        variety: values.variety,
        boxFixedPrefix: this.prefix,
        boxNumber: values.boxes,
        employee: values.employee
      }
      this.http.post(BASE_URL.getBaseUrl() + '/', data, {
        headers: {
          Autorization: token
        }
      })
        .subscribe((data: { boxes: [] }) => {
          this.http.get(BASE_URL.getBaseUrl() + '/print', {
            headers: {
              Autorization: token
            }
          })
            .subscribe((boxesData: { boxes: [] }) => {
              this.boxesArray = boxesData.boxes;
              this.fetched = true;
            },
              error => {
                this.service.success.emit(false);
                throw new Error('Something went wrong, try again')
              })
        })
    }
  }

  printBarcodes() {
    this.printed = true;
    let output = this.barcodes.nativeElement;
    var mywindow = window.open('', 'PRINT', 'height=1024,width=768');
    mywindow.document.write('<html><head><title>' + document.title + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(output.innerHTML);
    mywindow.document.write('</body></html>');
    mywindow.focus();
    mywindow.print();
    mywindow.close();
    return true;
  }
  confirmPrinted() {
    const token = this.service.getToken();
    this.http.post(BASE_URL.getBaseUrl() + '/printed', {}, {
      headers: {
        Autorization: token
      }
    })
      .subscribe((response: { success: boolean }) => {
        if (response.success) {
          this.service.success.emit(true);
          this.service.emitMessage.emit('Success')
          this.boxesArray = [];
          this.fetched = false;
          this.fetchingBarcodes = false;
          this.retry = true;
        } else {
          this.service.success.emit(false);
          this.service.emitMessage.emit('Something went wrong, try again');
        }

      })
  }
}
