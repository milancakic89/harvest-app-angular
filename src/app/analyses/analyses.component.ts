import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Service } from '../app.service';
import { BASE_URL } from '../base-url';

@Component({
  selector: 'app-analyses',
  templateUrl: './analyses.component.html',
  styleUrls: ['./analyses.component.css']
})
export class AnalysesComponent implements OnInit {

  sectors;
  total = 0;

  constructor(private http: HttpClient,
    private service: Service) { }

  ngOnInit(): void {
    const token = this.service.getToken();
    this.http.get(BASE_URL.getBaseUrl() + '/analyse', {
      headers: {
        Autorization: token
      }
    })
      .subscribe((data: { sectors, total }) => {
        if (Array.isArray(data.sectors) && data.sectors.length > 0) {
          this.total = data.total.toFixed(4);
          const sectorsData = data.sectors.sort((a, b) => {
            if (a.total > b.total) {
              return -1;
            } else if (b.total > a.total) {
              return 1;
            } else {
              return 0;
            }
          });
          this.sectors = sectorsData;
        }

      },
        error => this.service.emitMessage.emit(error))
  }

}
