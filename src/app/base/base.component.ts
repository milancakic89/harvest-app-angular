import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Service } from '../app.service';
import { BASE_URL } from '../base-url';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  boxes: [];
  constructor(private http: HttpClient,
    private service: Service) { }

  ngOnInit(): void {
    const token = this.service.getToken();
    this.http.get(BASE_URL.getBaseUrl() + '/base', {
      headers: {
        Autorization: token
      }
    })
      .subscribe((data: { boxes: [] }) => {
        this.boxes = data.boxes;
      })
  }
}
