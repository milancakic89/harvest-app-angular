import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Service } from 'src/app/app.service';
import { BASE_URL } from 'src/app/base-url';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @ViewChild('transferTo') transferTo: ElementRef;
  @ViewChild('fromWho') fromWho: ElementRef;

  id: string;
  employeeData;

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private service: Service,
    private router: Router) { }

  ngOnInit(): void {
    this.service.checkToken()
    const token = this.service.getToken();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      const data = { id: this.id }
      this.http.post(BASE_URL.getBaseUrl() + '/employee', data, {
        headers: {
          Autorization: token
        }
      })
        .subscribe(data => {
          this.employeeData = data;
        })
    });
  }
  transfer() {
    const employeeToTransfer = this.transferTo.nativeElement.value;
    const fromWho = this.fromWho.nativeElement.value;
    if (!employeeToTransfer || !fromWho) {
      this.service.success.emit(false);
      this.service.emitMessage.emit('Somethign went wrong! Try again');
      return;
    }
    const token = this.service.getToken();
    const data = {
      onWho: employeeToTransfer,
      fromWho: fromWho
    }
    this.http.post(BASE_URL.getBaseUrl() + '/transferBox', data, {
      headers: {
        Autorization: token
      }
    })
      .subscribe(data => {
        this.service.success.emit(true);
        this.service.emitMessage.emit('Success');
        this.router.navigate(['employees'])
      });
  }
  deleteEmployee() {
    const employee = this.fromWho.nativeElement.value;
    if (!employee) {
      return;
    }
    const token = this.service.getToken();
    const data = {
      id: employee
    }
    this.http.post(BASE_URL.getBaseUrl() + '/deleteEmployee', data, {
      headers: {
        Autorization: token
      }
    })
      .subscribe(data => {
        this.service.success.emit(true);
        this.service.emitMessage.emit('Success');
        return this.router.navigate(['employees'])
      });
  }
}
