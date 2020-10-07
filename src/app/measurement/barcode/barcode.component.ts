import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Service } from 'src/app/app.service';
import { BASE_URL } from 'src/app/base-url';


@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})

export class BarcodeComponent {
  value = '';
  success: boolean;
  barcodeData;
  selected;
  employees;
  constructor(private service: Service,
    private http: HttpClient) { }


  searchBarcode(form: NgForm) {
    const barcode = form.value.barcode;
    const token = this.service.getToken();
    this.http.get(BASE_URL.getBaseUrl() + `/barcode/${barcode}`, {
      headers: {
        Autorization: token
      }
    })
      .subscribe((data: { message: string, success: boolean, box, employees }) => {

        this.success = data.success;

        if (data.success) {
          this.service.success.emit(true);
          this.service.emitMessage.emit(data.message);
          this.selected = data.box.employee;
          this.employees = data.employees.filter(employee => {
            return employee.name != data.box.employee;
          });
          this.barcodeData = data;
          this.value = '';
          form.setValue({ barcode: '' })
        }
      },
        error => {
          this.service.success.emit(false);
          return this.service.emitMessage.emit("Something went wrong, try again" + error);
        })
  }


}
