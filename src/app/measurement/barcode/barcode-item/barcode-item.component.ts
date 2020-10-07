import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Service } from 'src/app/app.service';
import { Location } from '@angular/common';
import { BASE_URL } from 'src/app/base-url';

@Component({
  selector: 'app-barcode-item',
  templateUrl: './barcode-item.component.html',
  styleUrls: ['./barcode-item.component.css']
})
export class BarcodeItemComponent implements OnInit {
  @Input() barcode;
  @Input() employees;
  @Input() selected;

  currentPath = '';

  ngOnInit() {
    this.currentPath = this.location.path().slice(0, 8);
  }

  constructor(private service: Service, private http: HttpClient, private location: Location) { }

  updateBarcode(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const values = form.value;
    const token = this.service.getToken();
    this.http.post(BASE_URL.getBaseUrl() + '/measurement/record', values, {
      headers: {
        Autorization: token
      }
    })
      .subscribe((data) => {
        this.location.back();

      },
        error => {
          this.service.success.emit(false);
          this.service.emitMessage.emit(error)
        })
  }
  goBack() {
    let path = this.location.path().slice(0, 8);
    if (path == '/measure') {
      this.location.back();
    }
  }
}
