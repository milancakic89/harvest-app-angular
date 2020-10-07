import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../app.service';
import { BASE_URL } from '../base-url';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employeesData;
  constructor(private http: HttpClient,
    private service: Service,
    private router: Router) { }

  ngOnInit(): void {
    const token = this.service.getToken();
    this.http.get(BASE_URL.getBaseUrl() + '/employees', {
      headers: {
        Autorization: token
      }
    })
      .subscribe((data) => {
        this.employeesData = data;

      })
  }
  menageEmployee(event) {
    this.router.navigate(['/employees', event.target.value])
  }
}
