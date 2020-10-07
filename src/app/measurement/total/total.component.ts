import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/app.service';
import { BASE_URL } from 'src/app/base-url';


@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})

export class TotalComponent implements OnInit {
  fetched = false;
  reportData;
  total = 0;
  boxes = 0;

  constructor(private http: HttpClient,
    private service: Service) { }

  ngOnInit(): void {
    const token = this.service.getToken();

        this.http.get(BASE_URL.getBaseUrl() + '/total', {
          headers: {
            Autorization: token
          }
        })
          .subscribe((total: { data, total, boxes }) => {
            this.reportData = total.data;
            this.fetched = true;
            this.total = total.total;
            this.boxes = total.boxes;
          },
            error =>{
               this.service.success.emit(false);
                this.service.emitMessage.emit(error)
            })
  }

}
