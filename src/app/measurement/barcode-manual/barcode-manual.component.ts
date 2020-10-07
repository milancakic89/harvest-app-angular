import { HttpClient } from '@angular/common/http';
import { BoundText } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Service } from 'src/app/app.service';
import { BASE_URL } from 'src/app/base-url';

@Component({
  selector: 'app-barcode-manual',
  templateUrl: './barcode-manual.component.html',
  styleUrls: ['./barcode-manual.component.css']
})
export class BarcodeManualComponent implements OnInit {
  success = false;
  barcodeData;
  employees;
  selected = '';
  constructor(private service: Service, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const token = this.service.getToken();
    this.route.params.subscribe((params: Params) => {
      const barcode = params['barcode'];
      this.http.get(BASE_URL.getBaseUrl() + `/barcode/${barcode}`, {
        headers: {
          Autorization: token
        }
      })
        .subscribe((data: { box, employees }) => {
          this.selected = data.box.employee;
          this.employees = data.employees.filter(employee => {
            return employee.name != data.box.employee;
          });
             this.service.success.emit(true);
          this.service.emitMessage.emit('Success');
          this.barcodeData = data;
          this.success = true;
        },
          error => {
               this.service.success.emit(false);
               this.service.emitMessage.emit(error)
          })
    })
  }

}
